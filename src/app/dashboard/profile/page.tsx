"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, MapPin, Briefcase, Globe, Save, Loader2 } from "lucide-react";
import { availableSkills } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ProfilePage() {
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [fetchingBackground, setFetchingBackground] = useState(true);

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("fresher");
  const [bio, setBio] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    let isFetched = false;

    // Use onAuthStateChange which triggers synchronously on mount with cached local session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setEmail(session.user.email || "");
        
        // Optimistically set name from local user metadata instantly
        const metaName = session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User";
        setFullName(prev => prev || metaName);

        if (!isFetched) {
          isFetched = true;
          // Fetch full profile details asynchronously in the background
          supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()
            .then(({ data: pData }) => {
              if (pData) {
                setFullName(pData.full_name || metaName);
                setLocation(pData.location || "");
                setExperienceLevel(pData.experience_level || "fresher");
                setBio(pData.bio || "");
                setLinkedinUrl(pData.linkedin_url || "");
                setGithubUrl(pData.github_url || "");
                setSelectedSkills(pData.current_skills || []);
              }
              setFetchingBackground(false);
            })
            .catch((err) => {
              console.error("Background fetch error:", err);
              setFetchingBackground(false);
            });
        }
      } else {
        setFetchingBackground(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSaveChanges = async () => {
    if (!userId) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          location: location,
          experience_level: experienceLevel,
          bio: bio,
          linkedin_url: linkedinUrl,
          github_url: githubUrl,
          current_skills: selectedSkills,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        toast.error(`Error saving changes: ${error.message}`);
      } else {
        toast.success("Profile successfully updated!");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "JL";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="space-y-8 max-w-4xl relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
        </div>
        {fetchingBackground && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full border border-border/50">
            <Loader2 className="h-3 w-3 animate-spin text-indigo-500" />
            Syncing database...
          </div>
        )}
      </div>

      {/* Profile Header */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">{fullName || "Loading..."}</h2>
              <p className="text-sm text-muted-foreground">{email || "Loading email..."}</p>
              <Badge className="mt-2 bg-indigo-500/10 text-indigo-500 capitalize">{experienceLevel || "User"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-[family-name:var(--font-heading)]">
            <User className="inline h-4 w-4 mr-2" />Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Loading name..."
                className="rounded-xl bg-background/50 border-border/50 focus:border-indigo-500 transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                value={email} 
                disabled 
                placeholder="Loading email..."
                className="rounded-xl opacity-60 cursor-not-allowed" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="location"
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, India"
                  className="pl-10 rounded-xl bg-background/50 border-border/50 focus:border-indigo-500 transition-colors" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experienceLevel} onValueChange={(val) => setExperienceLevel(val)}>
                <SelectTrigger id="experience" className="rounded-xl bg-background/50 border-border/50 focus:border-indigo-500 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresher">Fresher</SelectItem>
                  <SelectItem value="junior">Junior (1-3 yrs)</SelectItem>
                  <SelectItem value="mid">Mid (3-5 yrs)</SelectItem>
                  <SelectItem value="senior">Senior (5+ yrs)</SelectItem>
                  <SelectItem value="lead">Lead / Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..." 
              className="rounded-xl min-h-[100px] bg-background/50 border-border/50 focus:border-indigo-500 transition-colors" 
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin"><Globe className="inline h-3 w-3 mr-1" />LinkedIn URL</Label>
              <Input 
                id="linkedin"
                value={linkedinUrl} 
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/..." 
                className="rounded-xl bg-background/50 border-border/50 focus:border-indigo-500 transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github"><Globe className="inline h-3 w-3 mr-1" />GitHub URL</Label>
              <Input 
                id="github"
                value={githubUrl} 
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..." 
                className="rounded-xl bg-background/50 border-border/50 focus:border-indigo-500 transition-colors" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-[family-name:var(--font-heading)]">
            <Briefcase className="inline h-4 w-4 mr-2" />Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableSkills.slice(0, 25).map(skill => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${selectedSkills.includes(skill) ? "bg-indigo-500 text-white hover:bg-indigo-600 scale-102" : "hover:bg-muted/30"}`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSaveChanges} 
        disabled={saving}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 px-8 py-5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
      >
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" /> Save Changes
          </>
        )}
      </Button>
    </div>
  );
}
