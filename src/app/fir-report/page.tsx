import fs from "fs";
import path from "path";

export default function FirReportPage() {
  const firFilePath = path.join(process.cwd(), "..", "fir", "fir-report-assistance.html");
  let htmlContent = "";

  try {
    htmlContent = fs.readFileSync(firFilePath, "utf8");
  } catch (error) {
    console.error("Error reading FIR report file:", error);
    htmlContent = "<h1>Error loading FIR Report</h1><p>Ensure the 'fir' folder exists at the root level.</p>";
  }

  return (
    <div className="fixed inset-0 z-[60] bg-white">
      {/* 
        We use an iframe with srcDoc to render the HTML file.
        This ensures that the styles from the HTML file (which has its own <body> and <nav>)
        do not conflict with Truthguard-X.
        The z-[60] ensures it covers the Truthguard-X Navbar if needed.
      */}
      <iframe
        srcDoc={htmlContent}
        className="w-full h-full border-none"
        title="FIR Report Assistance"
      />
      
      {/* Back button overlay if the user gets stuck, though the HTML has its own back button */}
      <div className="absolute top-4 left-4 z-50 pointer-events-none">
        {/* The HTML file already has a 'Back to App' button that calls window.history.back() */}
      </div>
    </div>
  );
}
