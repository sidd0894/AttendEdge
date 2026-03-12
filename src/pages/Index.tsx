import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, ChevronDown } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import LeaveDateSection from "@/components/LeaveDateSection";
import SubjectSelection from "@/components/SubjectSelection";
import AttendanceInput from "@/components/AttendanceInput";
import ResultsSection from "@/components/ResultsSection";

interface Subject {
  id: string;
  name: string;
}

interface AttendanceData {
  [subjectId: string]: { total: number; attended: number };
}

const STEPS = ["Leave Dates", "Subjects", "Attendance", "Results"];

const Index = () => {
  const { user, signOut } = useAuth();
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveDays, setLeaveDays] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});

  const displayName = user?.displayName || user?.email || "User";

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with user menu */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Attend<span className="text-primary">Edge</span>
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="hidden sm:inline text-sm max-w-[140px] truncate">
                  {displayName}
                </span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.displayName || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-center text-muted-foreground mb-8 text-sm">
          See how planned leave affects your attendance
        </p>

        <StepIndicator currentStep={step} steps={STEPS} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <LeaveDateSection
              key="step1"
              initial={{ startDate, endDate }}
              onNext={(d) => {
                setStartDate(d.startDate);
                setEndDate(d.endDate);
                setLeaveDays(d.leaveDays);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <SubjectSelection
              key="step2"
              initialSelected={selectedSubjects}
              onNext={(subs) => {
                setSelectedSubjects(subs);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <AttendanceInput
              key="step3"
              subjects={selectedSubjects}
              initialData={attendanceData}
              onNext={(data) => {
                setAttendanceData(data);
                setStep(4);
              }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <ResultsSection
              key="step4"
              subjects={selectedSubjects}
              attendanceData={attendanceData}
              leaveDays={leaveDays}
              onRecalculate={() => setStep(1)}
              onBack={() => setStep(3)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
