import { redirect } from "next/navigation";
import { createProfile } from "@/lib/users";

export default async function Page() {
  const newProfileData = {
    name: "Example Human",
    email: "Person67@gmail.com",
    image: "/default-avatar.png",
    areasOfInterest: [], 
    skills: [],
    education: [
      {
        school: "Stevens Institute of Technology",
        level: "Undergraduate",
        date: "2022-09-01 - 2026-05-01",
        description: "Computer Science",
      },
    ],
    experience: [
      {
        employer: "PairProj",
        position: "Developer",
        date: "2025-01-01 - 2025-12-01",
        description: "Designing for profile pages.",
      },
    ],
  };

  const createdProfile = await createProfile(newProfileData);

  redirect(`/profile/${createdProfile.id}`);
}
