import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  // Fetch some basic analytics from the db
  const totalResumes = await db.resume.count();
  const totalAnalyses = await db.analysis.count();
  
  const aiUsages = await db.aiUsage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { user: true }
  });

  const totalTokens = aiUsages.reduce((sum, usage) => sum + usage.tokensUsed, 0);

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Analytics Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="bg-slate-50"><CardTitle className="text-sm font-medium text-slate-500">Total Resumes Processed</CardTitle></CardHeader>
          <CardContent className="pt-6"><p className="text-4xl font-bold text-slate-800">{totalResumes}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-slate-50"><CardTitle className="text-sm font-medium text-slate-500">Total Analyses Run</CardTitle></CardHeader>
          <CardContent className="pt-6"><p className="text-4xl font-bold text-slate-800">{totalAnalyses}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-slate-50"><CardTitle className="text-sm font-medium text-slate-500">Recent Tokens Used</CardTitle></CardHeader>
          <CardContent className="pt-6"><p className="text-4xl font-bold text-slate-800">{totalTokens}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent AI Usage Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Operation</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Tokens</th>
                  <th className="px-6 py-3">Time (ms)</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {aiUsages.map((usage) => (
                  <tr key={usage.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{usage.operation}</td>
                    <td className="px-6 py-4">{usage.user?.email || "Anonymous"}</td>
                    <td className="px-6 py-4">{usage.tokensUsed}</td>
                    <td className="px-6 py-4">{usage.processingTimeMs}</td>
                    <td className="px-6 py-4">{new Date(usage.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
                {aiUsages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">No AI usage logged yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
