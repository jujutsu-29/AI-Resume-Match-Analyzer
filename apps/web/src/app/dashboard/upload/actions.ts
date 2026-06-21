'use server'

import { createClient } from '@/utils/supabase/server'

export async function saveAnalysisResult(resumeText: string, analysisData: any, fileName: string = "Resume") {
  const supabase = await createClient()

  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error("You must be logged in to save an analysis.")
  }

  // 2. Insert the resume text into the resumes table
  const { data: resumeData, error: resumeError } = await supabase
    .from('resumes')
    .insert({ 
      user_id: user.id, 
      content: resumeText,
      file_name: fileName
    })
    .select('id')
    .single()

  if (resumeError) {
    console.error("Error saving resume:", resumeError)
    throw new Error("Failed to save resume into the database.")
  }

  const resumeId = resumeData.id

  // 3. Insert the analysis data into the analyses table
  const { error: analysisError } = await supabase
    .from('analyses')
    .insert({
      resume_id: resumeId,
      user_id: user.id,
      ats_score: analysisData.ats_score,
      technical_score: analysisData.technical_score,
      analysis_data: analysisData
    })

  if (analysisError) {
    console.error("Error saving analysis:", analysisError)
    throw new Error("Failed to save analysis into the database.")
  }

  return { resumeId: resumeId.toString() }
}

export async function getUserResumes() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('resumes')
    .select('id, content, file_name, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching resumes:", error)
    return []
  }

  return data
}
