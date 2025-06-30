import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  placeholder: string;
  refPassword: React.RefObject<HTMLInputElement | null>;
};

export const PasswordInput = ({ placeholder, refPassword }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        ref={refPassword}
        placeholder={placeholder}
        required
        minLength={3}
        className="input"

      />
      <span
        onClick={() => setShow((prev) => !prev)}
        style={{
          position: "absolute",
          right: 10,
          top: "55%",
          transform: "translateY(-50%)",
          cursor: "pointer"
        }}
      >
        {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </span>
    </div>
  );
};