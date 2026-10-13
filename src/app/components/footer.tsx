import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";

export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              src={logoImage}
              alt="Studex Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2026 Studex - Academic Resource Sharing Platform
              </p>
              <p className="text-sm text-muted-foreground">
                Built by students, for students
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Contact: support@studex.edu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
