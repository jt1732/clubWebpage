"use server";

export async function createClubApplication(formData: FormData) {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
}
