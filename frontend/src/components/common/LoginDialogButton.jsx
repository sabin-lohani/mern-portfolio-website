import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LoginDialogButton() {
  const { user, googleLogin, logout } = useAuth();
  return (
    <>
      {!user ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1 bg-blue-700 hover:bg-blue-800">
              <FaUser />
              Login
            </Button>
          </DialogTrigger>

          <DialogContent>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Login</h2>
              <p className="text-sm">Like, comment, and participate in polls</p>
            </div>
            <GoogleLoginButton
              onClick={googleLogin}
              style={{
                fontSize: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-2 py-5">
              <img
                src={user.image}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover md:mr-2"
              />
              <span className="hidden md:block">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
