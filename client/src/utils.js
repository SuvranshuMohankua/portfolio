export const getFullImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;

    // Determine the base URL (backend usually serves /uploads)
    const base = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';

    // Always prepend the base if it's an uploaded image
    if (path.startsWith('/uploads')) {
        return `${base}${path}`;
    }

    // For images in the public folder (client/public), it's already at the root of the frontend
    return path;
};
