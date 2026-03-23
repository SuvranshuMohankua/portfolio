const pdfParse = require('pdf-parse');
const fs = require('fs');

/**
 * Parse a CV PDF file and extract structured data
 * Uses heuristic regex-based parsing for common CV formats
 */
async function parseCV(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    const result = {
        name: extractName(text),
        title: extractTitle(text),
        summary: extractSummary(text),
        skills: extractSkills(text),
        projects: extractProjects(text),
        education: extractEducation(text),
        experience: extractExperience(text),
        contact: extractContact(text),
        certificates: []
    };

    return result;
}

function extractName(text) {
    // First non-empty line is usually the name
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length > 0) {
        // Take first line, remove common prefixes
        let name = lines[0].replace(/^(resume|cv|curriculum vitae)[\s:\-]*/i, '').trim();
        // If it looks like a name (2-4 words, no special chars)
        if (name.split(/\s+/).length <= 5 && /^[A-Za-z\s.'-]+$/.test(name)) {
            return name;
        }
    }
    return 'Your Name';
}

function extractTitle(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const titleKeywords = ['developer', 'engineer', 'designer', 'analyst', 'manager', 'architect', 'scientist', 'intern', 'student'];
    for (let i = 0; i < Math.min(lines.length, 10); i++) {
        const line = lines[i].toLowerCase();
        if (titleKeywords.some(k => line.includes(k))) {
            return lines[i];
        }
    }
    return 'Software Developer';
}

function extractSummary(text) {
    const sections = splitSections(text);
    for (const [heading, content] of sections) {
        if (/summary|objective|about|profile|introduction/i.test(heading)) {
            return content.slice(0, 500).trim();
        }
    }
    // Fallback: take lines after name/title area
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const summary = lines.slice(2, 6).join(' ').slice(0, 500);
    return summary || 'Passionate developer building innovative web applications.';
}

function extractSkills(text) {
    const sections = splitSections(text);
    for (const [heading, content] of sections) {
        if (/skills|technologies|technical|competencies|proficiency/i.test(heading)) {
            // Split by common delimiters
            const skills = content
                .split(/[,|•●▪◦\-\n\t;]+/)
                .map(s => s.replace(/[\u2022\u2023\u25E6\u2043\u2219]/g, '').trim())
                .filter(s => s.length > 0 && s.length < 40);
            return [...new Set(skills)];
        }
    }
    // Fallback: look for skill-like patterns
    const skillRegex = /(?:JavaScript|TypeScript|Python|Java|C\+\+|React|Angular|Vue|Node\.?js|Express|MongoDB|SQL|Git|Docker|AWS|HTML|CSS|Three\.js|Next\.js)/gi;
    const found = text.match(skillRegex) || [];
    return [...new Set(found)];
}

function extractProjects(text) {
    const sections = splitSections(text);
    const projects = [];

    for (const [heading, content] of sections) {
        if (/projects?/i.test(heading) && !/experience/i.test(heading)) {
            const lines = content.split('\n').filter(l => l.trim().length > 0);
            let currentProject = null;

            for (const line of lines) {
                const trimmed = line.trim();
                // Detect project titles (lines starting with bullet or capital, short length)
                if (
                    (trimmed.length < 80 && /^[A-Z•●\-\d]/.test(trimmed) && !trimmed.includes(':')) ||
                    /^[\d]+[.)\s]/.test(trimmed)
                ) {
                    if (currentProject) projects.push(currentProject);
                    const title = trimmed.replace(/^[•●▪◦\-\d.)\s]+/, '').trim();
                    currentProject = {
                        id: projects.length + 1,
                        title: title,
                        description: '',
                        image: '',
                        github: '',
                        live: '',
                        tech: []
                    };
                } else if (currentProject) {
                    // Extract links
                    const githubMatch = trimmed.match(/https?:\/\/github\.com[^\s)]+/i);
                    const liveMatch = trimmed.match(/https?:\/\/(?!github)[^\s)]+/i);
                    if (githubMatch) currentProject.github = githubMatch[0];
                    if (liveMatch && !githubMatch) currentProject.live = liveMatch[0];

                    // Extract tech stack
                    const techMatch = trimmed.match(/(?:tech(?:nolog(?:ies|y))?|stack|built with|tools?)[\s:]+(.+)/i);
                    if (techMatch) {
                        currentProject.tech = techMatch[1].split(/[,|•]+/).map(t => t.trim()).filter(t => t);
                    } else {
                        currentProject.description += (currentProject.description ? ' ' : '') + trimmed;
                    }
                }
            }
            if (currentProject) projects.push(currentProject);
        }
    }

    return projects.length > 0 ? projects : [{
        id: 1,
        title: 'Portfolio Website',
        description: 'A stunning animated portfolio built with React and Three.js',
        image: '',
        github: 'https://github.com',
        live: '',
        tech: ['React', 'Three.js', 'Node.js']
    }];
}

function extractEducation(text) {
    const sections = splitSections(text);
    const education = [];

    for (const [heading, content] of sections) {
        if (/education|academic|qualification/i.test(heading)) {
            const lines = content.split('\n').filter(l => l.trim().length > 0);
            let current = null;

            for (const line of lines) {
                const trimmed = line.trim();
                const yearMatch = trimmed.match(/(20\d{2})\s*[-–—]\s*(20\d{2}|present|current)/i) ||
                    trimmed.match(/(20\d{2})/);

                if (yearMatch && trimmed.length < 120) {
                    if (current) education.push(current);
                    current = {
                        degree: trimmed.replace(yearMatch[0], '').replace(/[|,\-–—\s]+$/, '').trim(),
                        institution: '',
                        year: yearMatch[0].trim()
                    };
                } else if (current && !current.institution) {
                    current.institution = trimmed.replace(/^[•●▪◦\-\s]+/, '').trim();
                } else if (current) {
                    if (!current.degree || current.degree.length < trimmed.length) {
                        current.institution = current.degree;
                        current.degree = trimmed.replace(/^[•●▪◦\-\s]+/, '').trim();
                    }
                }
            }
            if (current) education.push(current);
        }
    }

    return education.length > 0 ? education : [{
        degree: 'Bachelor\'s Degree',
        institution: 'University',
        year: '2020-2024'
    }];
}

function extractExperience(text) {
    const sections = splitSections(text);
    const experience = [];

    for (const [heading, content] of sections) {
        if (/experience|employment|work history|professional/i.test(heading)) {
            const lines = content.split('\n').filter(l => l.trim().length > 0);
            let current = null;

            for (const line of lines) {
                const trimmed = line.trim();
                const yearMatch = trimmed.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s.]*\d{4})\s*[-–—]\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s.]*\d{4}|present|current)/i) ||
                    trimmed.match(/(20\d{2})\s*[-–—]\s*(20\d{2}|present|current)/i);

                if (yearMatch) {
                    if (current) experience.push(current);
                    const rolePart = trimmed.replace(yearMatch[0], '').replace(/[|,\-–—\s]+$/, '').trim();
                    current = {
                        role: rolePart || 'Developer',
                        company: '',
                        duration: yearMatch[0].trim(),
                        description: ''
                    };
                } else if (current) {
                    if (!current.company) {
                        current.company = trimmed.replace(/^[•●▪◦\-\s]+/, '').trim();
                    } else {
                        current.description += (current.description ? ' ' : '') + trimmed.replace(/^[•●▪◦\-\s]+/, '').trim();
                    }
                }
            }
            if (current) experience.push(current);
        }
    }

    return experience;
}

function extractContact(text) {
    const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
    const phoneMatch = text.match(/(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[^\s)]+/i);
    const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s)]+/i);

    return {
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : '',
        linkedin: linkedinMatch ? linkedinMatch[0] : '',
        github: githubMatch ? githubMatch[0] : ''
    };
}

/**
 * Split CV text into sections by detecting headings
 * Returns array of [heading, content] pairs
 */
function splitSections(text) {
    const lines = text.split('\n');
    const sections = [];
    let currentHeading = 'header';
    let currentContent = [];

    const headingPatterns = [
        /^[A-Z\s]{3,}$/,
        /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s*$/,
        /^(?:summary|skills|technologies|projects?|education|experience|contact|certificates?|awards?|achievements?|objective|profile|about|work|employment|qualifications?|training|publications?|interests?|hobbies?|references?|languages?)[\s:]*$/i
    ];

    for (const line of lines) {
        const trimmed = line.trim();
        const isHeading = trimmed.length > 0 && trimmed.length < 50 &&
            headingPatterns.some(p => p.test(trimmed));

        if (isHeading) {
            if (currentContent.length > 0) {
                sections.push([currentHeading, currentContent.join('\n')]);
            }
            currentHeading = trimmed;
            currentContent = [];
        } else {
            currentContent.push(line);
        }
    }

    if (currentContent.length > 0) {
        sections.push([currentHeading, currentContent.join('\n')]);
    }

    return sections;
}

module.exports = { parseCV };
