import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function PasswordField({
  label,
  id,
  register,
  errors,
  helperText,
  message,
}: {
  label: string;
  id: string;
  register: any;
  errors: any;
  helperText: any;
  message: string;
}) {
  const [visibility, setVisibility] = useState<boolean>(false);

  const EyeIcon = ({ visibility, setVisibility }: any) => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => {
            setVisibility(!visibility);
          }}
        >
          {visibility ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <TextField
      label={label}
      id={id}
      type={visibility ? "text" : "password"}
      fullWidth
      required
      {...register(id, {
        required: { value: true, message: message },
        minLength: { value: 8, message: "Minimum 8 characters" },
        pattern: {
          value: /^\S*$/,
          message: "Space Detected",
        },
      })}
      error={errors}
      helperText={helperText}
      autoComplete="on"
      InputProps={{
        endAdornment: (
          <EyeIcon visibility={visibility} setVisibility={setVisibility} />
        ),
        inputProps: { maxLength: 20 },
      }}
    />
  );
}

export default PasswordField;
