const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchUserSkills = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/skills/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch skills");
        return await response.json();
    } catch (error) {
        console.error("Error fetching skills:", error);
        return [];
    }
};

export const fetchUserInfo = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${email}`);
        if (!response.ok) throw new Error("Failed to fetch user info");
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const addSkill = async (userId, skill) => {
    try {
        const response = await fetch(`${API_BASE_URL}/skills/add/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skill),
        });
        if (!response.ok) throw new Error("Failed to add skill");
        return await response.json();
    } catch (error) {
        console.error("Error adding skill:", error);
        return null;
    }
};
export const updateSkillLevel = async (skillId, newLevel) => {
    try {
        console.log(`Updating skill ${skillId} to ${newLevel}`);
        const response = await fetch(`${API_BASE_URL}/skills/update/${skillId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ level: newLevel }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update skill: ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating skill:", error);
        return null;
    }
};

export const fetchUserRoadmap = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/roadmap/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch roadmap");
        return await response.json();
    } catch (error) {
        console.error("Error fetching roadmap:", error);
        return [];
    }
};

export const addRoadmapStep = async (userId, step) => {
    try {
        const response = await fetch(`${API_BASE_URL}/roadmap/add/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(step),
        });
        if (!response.ok) throw new Error("Failed to add step");
        return await response.json();
    } catch (error) {
        console.error("Error adding step:", error);
        return null;
    }
};

export const updateRoadmapStepStatus = async (stepId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/roadmap/update/${stepId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error("Failed to update status");
        return await response.json();
    } catch (error) {
        console.error("Error updating status:", error);
        return null;
    }
};

export const deleteRoadmapStep = async (stepId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/roadmap/delete/${stepId}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting step:", error);
        return false;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

