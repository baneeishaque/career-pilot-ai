"use client";

import React from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useResumeOptimizer } from "@/hooks/useResumeOptimizer";

export interface DashboardProps {}

export default function Dashboard({}: Readonly<DashboardProps>) {
  const {
    resumeName,
    jobDescription,
    setJobDescription,
    isProcessing,
    matchScore,
    downloadReady,
    errorMessage,
    steps,
    dragActive,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleFileChange,
    triggerFileSelect,
    handleStartProcess,
    handleDownload,
    tailoredResumeText,
    coverLetterText,
  } = useResumeOptimizer();

  return (
    <div className="min-h-screen bg-black text-on-surface select-none">
      {/* Sidebar Navigation */}
      <DashboardSidebar className="hidden md:flex" />

      {/* Top AppBar */}
      <DashboardHeader />

      {/* Main Content Canvas */}
      <main className="md:ml-64 pt-24 pb-xl px-xl max-w-[1400px] mx-auto">
        {/* Page Title */}
        <section className="mb-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Resume Optimization</h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Upload your documents to tailor your resume and cover letter for specific job opportunities.
          </p>
        </section>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-lg p-sm bg-error-container text-error rounded-xl border border-error/20 flex items-center gap-xs font-label-md">
            <span className="material-symbols-outlined">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Upload Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-lg">
          {/* Resume Upload */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-gutter flex flex-col h-[280px]">
            <div className="flex items-center gap-2 mb-md">
              <span className="material-symbols-outlined text-primary">description</span>
              <h3 className="text-on-surface font-bold text-headline-md">Resume Upload</h3>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
            />

            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`flex-1 border-2 border-dashed rounded-lg bg-surface-container-low transition-colors cursor-pointer flex flex-col items-center justify-center p-lg group ${
                dragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-outline-variant hover:border-primary/50"
              }`}
            >
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant group-hover:text-primary transition-colors mb-2">
                cloud_upload
              </span>
              <p className="text-on-surface font-medium mb-1">
                {resumeName ? `Selected: ${resumeName}` : "Drag and drop your resume here"}
              </p>
              <p className="text-on-surface-variant text-label-sm">Supports PDF, DOCX (Max 5MB)</p>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-gutter flex flex-col h-[280px]">
            <div className="flex items-center justify-between mb-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">target</span>
                <h3 className="text-on-surface font-bold text-headline-md">Job Description</h3>
              </div>
              <button 
                onClick={triggerFileSelect} 
                className="text-label-sm text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">attach_file</span>
                Upload File
              </button>
            </div>
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="flex-1 w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40 resize-none" 
              placeholder="Paste the job description here to help CareerPilot AI optimize your application..."
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-xl">
          <button 
            onClick={handleStartProcess}
            disabled={isProcessing}
            className={`group relative px-lg py-4 bg-primary text-black font-extrabold rounded shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className={`material-symbols-outlined ${isProcessing ? "rotate-animation" : "group-hover:rotate-12 transition-transform"}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {isProcessing ? "hourglass_empty" : "auto_awesome"}
            </span>
            {isProcessing ? "Optimizing..." : "Generate with AI"}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Dynamic AI Steps Loading Section */}
        {isProcessing && (
          <div className="mb-xl bg-surface-container border border-outline-variant rounded-xl p-gutter space-y-md">
            <h3 className="text-white font-bold text-headline-md">AI Pipeline Execution</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
              {steps.map((step) => {
                const isActive = step.status === "active";
                const isComplete = step.status === "complete";
                
                return (
                  <div 
                    key={step.id} 
                    className={`p-md rounded-lg border transition-all duration-300 ${
                      isActive 
                        ? "bg-primary-container/10 border-primary" 
                        : isComplete 
                        ? "bg-surface-container-low border-outline-variant opacity-90" 
                        : "bg-surface-container-low border-outline-variant/30 opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-sm">
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant">Step</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary pulse-animation"></span>
                      )}
                      {isComplete && (
                        <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-body-md mb-xs">{step.name}</h4>
                    <p className="text-[11px] text-on-surface-variant">
                      {isActive ? "Currently running..." : isComplete ? "Completed successfully" : "Awaiting previous steps..."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="space-y-md">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Optimized Output</h2>
            <div className="h-px flex-1 bg-outline-variant"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {/* Qualification Score */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-gutter flex flex-col justify-between min-h-[380px]">
              <div>
                <h3 className="text-on-surface font-bold text-headline-md mb-lg">Qualification Score</h3>
                <div className="relative w-40 h-40 mx-auto mb-lg">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path 
                      className="text-surface-container-high stroke-current" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      fill="none" 
                      strokeWidth="3"
                    ></path>
                    <path 
                      className="text-primary stroke-current transition-all duration-1000 ease-out" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      fill="none" 
                      strokeDasharray={`${matchScore || 0}, 100`} 
                      strokeLinecap="round" 
                      strokeWidth="3"
                    ></path>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-headline-lg font-bold text-on-surface">
                      {matchScore !== null ? `${matchScore}%` : "--%"}
                    </span>
                    <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">Match</span>
                  </div>
                </div>
                <div className="space-y-3 mb-gutter flex-1">
                  <p className="text-label-sm text-on-surface-variant font-bold">TOP SKILL MATCHES</p>
                  <div className="flex flex-wrap gap-2">
                    {jobDescription.toLowerCase().includes("react") && (
                      <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">React.js</span>
                    )}
                    {jobDescription.toLowerCase().includes("aws") && (
                      <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">AWS</span>
                    )}
                    {jobDescription.toLowerCase().includes("python") && (
                      <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">Python</span>
                    )}
                    {jobDescription.toLowerCase().includes("go") && (
                      <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">Go Lang</span>
                    )}
                    {jobDescription.toLowerCase().includes("systems") && (
                      <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">System Design</span>
                    )}
                    {(!jobDescription.toLowerCase().includes("react") && !jobDescription.toLowerCase().includes("aws") && !jobDescription.toLowerCase().includes("python") && !jobDescription.toLowerCase().includes("go") && !jobDescription.toLowerCase().includes("systems")) && (
                      <>
                        <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">React.js</span>
                        <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">System Design</span>
                        <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-primary rounded-full text-label-sm">AWS</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDownload("report")} 
                disabled={!downloadReady}
                className="w-full py-3 bg-transparent border border-outline-variant hover:bg-surface-container-high text-on-surface font-medium rounded transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[20px]">insights</span>
                Download Analysis Report
              </button>
            </div>

            {/* ATS Optimized Resume */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-gutter flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between mb-md">
                  <h3 className="text-on-surface font-bold text-headline-md">ATS Optimized Resume</h3>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${downloadReady ? "bg-[#064E3B] text-[#34D399]" : "bg-surface-container-high text-on-surface-variant"}`}>
                    {downloadReady ? "READY" : "AWAITING"}
                  </span>
                </div>
                <div className="flex-1 bg-surface-container-lowest rounded-lg border border-outline-variant p-md mb-gutter max-h-[200px] overflow-y-auto custom-scrollbar relative">
                  {downloadReady ? (
                    <div className="font-body-sm text-body-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed text-left">
                      {tailoredResumeText}
                    </div>
                  ) : (
                    <div className="h-[200px] w-full bg-white/5 blur-[2px] pointer-events-none p-gutter space-y-4">
                      <div className="h-4 w-3/4 bg-on-surface/10 rounded"></div>
                      <div className="h-4 w-full bg-on-surface/10 rounded"></div>
                      <div className="h-4 w-5/6 bg-on-surface/10 rounded"></div>
                      <div className="pt-8 space-y-2">
                        <div className="h-3 w-1/4 bg-on-surface/5 rounded"></div>
                        <div className="h-3 w-full bg-on-surface/5 rounded"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => handleDownload("resume")} 
                disabled={!downloadReady}
                className="w-full py-3 bg-transparent border border-outline-variant hover:bg-surface-container-high text-on-surface font-medium rounded transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[20px]">description</span>
                Download Resume (.MD)
              </button>
            </div>

            {/* Personalized Cover Letter */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-gutter flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between mb-md">
                  <h3 className="text-on-surface font-bold text-headline-md">Personalized Cover Letter</h3>
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">edit</span>
                </div>
                <div className="flex-1 bg-surface-container-lowest rounded-lg border border-outline-variant p-md mb-gutter max-h-[200px] overflow-y-auto custom-scrollbar">
                  {downloadReady ? (
                    <div className="font-body-md text-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed text-left">
                      {coverLetterText}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-on-surface-variant/40 italic text-body-md">
                      Generate report to see cover letter preview...
                    </div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => handleDownload("cover-letter")} 
                disabled={!downloadReady}
                className="w-full py-3 bg-transparent border border-outline-variant hover:bg-surface-container-high text-on-surface font-medium rounded transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[20px]">description</span>
                Download Cover Letter (.MD)
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Subtle Element */}
        <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      </main>
    </div>
  );
}
