"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { updateProfile } from "@/app/actions/users";

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
}

export function EditProfile({ profile }: { profile: any }) {
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
  const [showExpForm, setShowExpForm] = useState(false);
  const [newExp, setNewExp] = useState<ExperienceInput>({
    employer: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

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
  const [showEduForm, setShowEduForm] = useState(false);
  const [newEdu, setNewEdu] = useState<EducationInput>({
    school: "",
    level: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [skills, setSkills] = useState<SkillInput[]>(
    (profile.skills ?? []).map((s: any) => ({
      skillId: s.skillId ?? s.skill?.id ?? "",
      skillLevel: s.skillLevel ?? "",
      name: s.skill?.name ?? "",
    }))
  );
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", skillLevel: "" });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addExperience = () => {
    if (!newExp.employer || !newExp.position) return;
    setExperience((prev) => [...prev, { ...newExp }]);
    setNewExp({ employer: "", position: "", startDate: "", endDate: "", description: "" });
    setShowExpForm(false);
  };

  const removeExperience = (index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    if (!newEdu.school || !newEdu.level) return;
    setEducation((prev) => [...prev, { ...newEdu }]);
    setNewEdu({ school: "", level: "", startDate: "", endDate: "", description: "" });
    setShowEduForm(false);
  };

  const removeEducation = (index: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (!newSkill.name) return;
    setSkills((prev) => [
      ...prev,
      { skillId: newSkill.name, skillLevel: newSkill.skillLevel, name: newSkill.name },
    ]);
    setNewSkill({ name: "", skillLevel: "" });
    setShowSkillForm(false);
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
    } catch (e: any) {
      setError(e.message ?? "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
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

              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                  >
                    <span>{s.name ?? s.skillId}</span>
                    {s.skillLevel && (
                      <span className="text-gray-500">· {s.skillLevel}</span>
                    )}
                    <button
                      onClick={() => removeSkill(i)}
                      className="ml-1 text-red-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowSkillForm(!showSkillForm)}
                className="w-fit rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
              >
                {showSkillForm ? "Cancel" : "Add Skill"}
              </button>

              {showSkillForm && (
                <div className="mt-2 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Skill (e.g. React)"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="rounded border p-2"
                  />
                  <input
                    type="text"
                    placeholder="Level (e.g. Beginner, Advanced)"
                    value={newSkill.skillLevel}
                    onChange={(e) => setNewSkill({ ...newSkill, skillLevel: e.target.value })}
                    className="rounded border p-2"
                  />
                  <button
                    onClick={addSkill}
                    className="w-fit rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="flex w-full flex-col">
              <h2 className="text-4xl font-bold">Education</h2>

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
                  <input
                    type="date"
                    value={e.startDate}
                    onChange={(ev) =>
                      setEducation((prev) =>
                        prev.map((item, idx) =>
                          idx === i ? { ...item, startDate: ev.target.value } : item
                        )
                      )
                    }
                    className="mb-1 w-full rounded border p-2"
                  />
                  <input
                    type="date"
                    value={e.endDate}
                    onChange={(ev) =>
                      setEducation((prev) =>
                        prev.map((item, idx) =>
                          idx === i ? { ...item, endDate: ev.target.value } : item
                        )
                      )
                    }
                    className="mb-1 w-full rounded border p-2"
                  />
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

              <div className="mt-3">
                <button
                  onClick={() => setShowEduForm(!showEduForm)}
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  {showEduForm ? "Cancel" : "Add Education"}
                </button>

                {showEduForm && (
                  <div className="mt-4 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="School"
                      value={newEdu.school}
                      onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
                      className="rounded border p-2"
                    />
                    <input
                      type="text"
                      placeholder="Level"
                      value={newEdu.level}
                      onChange={(e) => setNewEdu({ ...newEdu, level: e.target.value })}
                      className="rounded border p-2"
                    />
                    <input
                      type="date"
                      value={newEdu.startDate}
                      onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
                      className="rounded border p-2"
                    />
                    <input
                      type="date"
                      value={newEdu.endDate}
                      onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
                      className="rounded border p-2"
                    />
                    <textarea
                      placeholder="Description"
                      value={newEdu.description}
                      onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                      className="rounded border p-2"
                    />
                    <button
                      onClick={addEducation}
                      className="w-fit rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4 p-4">
        <CardContent>
          <h3 className="mb-4 text-4xl font-bold">Experience</h3>

          {experience.map((exp, i) => (
            <div key={i} className="mb-4 rounded border p-3">
              <input
                type="text"
                placeholder="Employer"
                value={exp.employer}
                onChange={(e) =>
                  setExperience((prev) =>
                    prev.map((item, idx) =>
                      idx === i ? { ...item, employer: e.target.value } : item
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
                      idx === i ? { ...item, position: e.target.value } : item
                    )
                  )
                }
                className="mb-1 w-full rounded border p-2"
              />
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) =>
                  setExperience((prev) =>
                    prev.map((item, idx) =>
                      idx === i ? { ...item, startDate: e.target.value } : item
                    )
                  )
                }
                className="mb-1 w-full rounded border p-2"
              />
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) =>
                  setExperience((prev) =>
                    prev.map((item, idx) =>
                      idx === i ? { ...item, endDate: e.target.value } : item
                    )
                  )
                }
                className="mb-1 w-full rounded border p-2"
              />
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

          <button
            onClick={() => setShowExpForm(!showExpForm)}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            {showExpForm ? "Cancel" : "Add Experience"}
          </button>

          {showExpForm && (
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Employer"
                value={newExp.employer}
                onChange={(e) => setNewExp({ ...newExp, employer: e.target.value })}
                className="rounded border p-2"
              />
              <input
                type="text"
                placeholder="Position"
                value={newExp.position}
                onChange={(e) => setNewExp({ ...newExp, position: e.target.value })}
                className="rounded border p-2"
              />
              <input
                type="date"
                value={newExp.startDate}
                onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
                className="rounded border p-2"
              />
              <input
                type="date"
                value={newExp.endDate}
                onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
                className="rounded border p-2"
              />
              <textarea
                placeholder="Description"
                value={newExp.description}
                onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                className="rounded border p-2"
              />
              <button
                onClick={addExperience}
                className="w-fit rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          )}
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
