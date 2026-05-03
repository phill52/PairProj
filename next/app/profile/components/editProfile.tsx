"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { updateProfile } from "@/app/actions/users";
import { useRouter } from "next/navigation";
import Badge from "@/components/badge";

interface ExperienceInput {
  id?: string;
  employer: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationInput {
  id?: string;
  school: string;
  level: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface SkillInput {
  skillId: string;
  skillLevel: string;
  name?: string;
  innerColor?: string;
  outerColor?: string;
}

export function EditProfile({ profile }: { profile: any }) {
  const router = useRouter();
  const initials = profile.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const [name, setName] = useState<string>(profile.name ?? "");
  const [email, setEmail] = useState<string>(profile.email ?? "");
  const [image, setImage] = useState<string>(profile.image ?? "");

  const [experience, setExperience] = useState<ExperienceInput[]>(
    (profile.experience ?? []).map((e: any) => ({
      id: e.id,
      employer: e.employer ?? "",
      position: e.position ?? "",
      startDate: e.startDate ? new Date(e.startDate).toISOString().split("T")[0] : "",
      endDate: e.endDate ? new Date(e.endDate).toISOString().split("T")[0] : "",
      description: e.description ?? "",
    }))
  );

  const [education, setEducation] = useState<EducationInput[]>(
    (profile.education ?? []).map((e: any) => ({
      id: e.id,
      school: e.school ?? "",
      level: e.level ?? "",
      startDate: e.startDate ? new Date(e.startDate).toISOString().split("T")[0] : "",
      endDate: e.endDate ? new Date(e.endDate).toISOString().split("T")[0] : "",
      description: e.description ?? "",
    }))
  );

  const [skills, setSkills] = useState<SkillInput[]>(
    (profile.skills ?? []).map((s: any) => ({
      skillId: s.skillId ?? s.skill?.id ?? "",
      skillLevel: s.skillLevel ?? "",
      name: s.skill?.name ?? "",
      innerColor: s.skill?.innerColor,
      outerColor: s.skill?.outerColor,
    }))
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const removeExperience = (index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  };

  const removeEducation = (index: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await updateProfile({
        name,
        email,
        image,
        areasOfInterest: (profile.areasOfInterest ?? []).map((a: any) => a.id),
        skills: skills.map((s) => ({ skillId: s.skillId, skillLevel: s.skillLevel })),
        education: education.map((e) => ({
          school: e.school,
          level: e.level,
          startDate: e.startDate ? new Date(e.startDate) : new Date(),
          endDate: e.endDate ? new Date(e.endDate) : null,
          description: e.description,
        })),
        experience: experience.map((e) => ({
          employer: e.employer,
          position: e.position,
          startDate: e.startDate ? new Date(e.startDate) : new Date(),
          endDate: e.endDate ? new Date(e.endDate) : null,
          description: e.description,
        })),
      });
      setSuccess(true);
      router.push(`/profile/${profile.id}`);
    } catch (e: any) {
      setError(e.message ?? "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.push(`/profile/${profile.id}`)}
        className="mb-4 rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
      >
        ← Back to Profile without saving
      </button>
      <Card className="mb-8 flex items-center space-x-8 space-y-1 p-4">
        <CardHeader>
          <Avatar className="mb-4 h-[10rem] w-[10rem] rounded-full p-2 shadow-md ring-gray-800">
            <AvatarImage src={image} alt="User Image" />
            <AvatarFallback className="text-5xl">{initials}</AvatarFallback>
          </Avatar>
        </CardHeader>

        <CardContent className="w-full">
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col gap-2">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded border p-2"
              />

              <label className="font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded border p-2"
              />

              <label className="font-semibold">Profile Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="rounded border p-2"
              />

              <div className="mt-3 text-lg font-bold">Skills</div>
              {skills.length === 0 && <p className="text-sm text-gray-500">No skills added yet. Add some on your profile page!</p>}
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <Badge
                      text={s.name ?? s.skillId}
                      innerColor={s.innerColor}
                      outerColor={s.outerColor}
                    />
                    <button
                      onClick={() => removeSkill(i)}
                      className="ml-1 text-red-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col">
              <h2 className="text-4xl font-bold">Education</h2>
              {education.length === 0 && <p className="text-sm text-gray-500">No education added yet. Add some on your profile page!</p>}
              {education.map((e, i) => (
                <div key={i} className="mt-2 rounded border p-3">
                  <input
                    type="text"
                    placeholder="School"
                    value={e.school}
                    onChange={(ev) =>
                      setEducation((prev) =>
                        prev.map((item, idx) =>
                          idx === i ? { ...item, school: ev.target.value } : item
                        )
                      )
                    }
                    className="mb-1 w-full rounded border p-2 text-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Level"
                    value={e.level}
                    onChange={(ev) =>
                      setEducation((prev) =>
                        prev.map((item, idx) =>
                          idx === i ? { ...item, level: ev.target.value } : item
                        )
                      )
                    }
                    className="mb-1 w-full rounded border p-2"
                  />
                  <div className="mb-2">
                    <label className="mb-1 block text-sm font-medium">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={e.startDate}
                      onChange={(ev) =>
                        setEducation((prev) =>
                          prev.map((item, idx) =>
                            idx === i
                              ? { ...item, startDate: ev.target.value }
                              : item
                          )
                        )
                      }
                      className="w-full rounded border p-2"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="mb-1 block text-sm font-medium">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={e.endDate}
                      onChange={(ev) =>
                        setEducation((prev) =>
                          prev.map((item, idx) =>
                            idx === i
                              ? { ...item, endDate: ev.target.value }
                              : item
                          )
                        )
                      }
                      className="w-full rounded border p-2"
                    />
                  </div>

                  <textarea
                    placeholder="Description"
                    value={e.description}
                    onChange={(ev) =>
                      setEducation((prev) =>
                        prev.map((item, idx) =>
                          idx === i ? { ...item, description: ev.target.value } : item
                        )
                      )
                    }
                    className="mb-1 w-full rounded border p-2"
                  />
                  <button
                    onClick={() => removeEducation(i)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4 p-4">
        <CardContent>
          <h3 className="mb-4 text-4xl font-bold">Experience</h3>
          {experience.length === 0 && <p className="text-sm text-gray-500">No experience added yet. Add some on your profile page!</p>}
          {experience.map((exp, i) => (
            <div key={i} className="mb-4 rounded border p-3">
              <input
                type="text"
                placeholder="Employer"
                value={exp.employer}
                onChange={(e) =>
                  setExperience((prev) =>
                    prev.map((item, idx) =>
                      idx === i
                        ? { ...item, employer: e.target.value }
                        : item
                    )
                  )
                }
                className="mb-1 w-full rounded border p-2 text-xl font-bold"
              />

              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) =>
                  setExperience((prev) =>
                    prev.map((item, idx) =>
                      idx === i
                        ? { ...item, position: e.target.value }
                        : item
                    )
                  )
                }
                className="mb-1 w-full rounded border p-2"
              />

              <div className="mb-2">
                <label className="mb-1 block text-sm font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    setExperience((prev) =>
                      prev.map((item, idx) =>
                        idx === i
                          ? { ...item, startDate: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full rounded border p-2"
                />
              </div>

              <div className="mb-2">
                <label className="mb-1 block text-sm font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    setExperience((prev) =>
                      prev.map((item, idx) =>
                        idx === i
                          ? { ...item, endDate: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full rounded border p-2"
                />
              </div>

              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  setExperience((prev) =>
                    prev.map((item, idx) =>
                      idx === i ? { ...item, description: e.target.value } : item
                    )
                  )
                }
                className="mb-1 w-full rounded border p-2"
              />
              <button
                onClick={() => removeExperience(i)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
        {success && <p className="text-green-600">Profile saved successfully!</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}