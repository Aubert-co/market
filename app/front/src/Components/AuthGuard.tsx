import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "./Loading";

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/auth/me", {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => {
        setAuthenticated(res.ok);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading/>

  if (!authenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
