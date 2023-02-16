import { FieldError, FieldErrors, useForm } from "react-hook-form";

// Better validation
// Better Erros (set, clear, display)
// Have control over inputs
interface LoginFormProps {
  username: string;
  email: string;
  password: string;
  error: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginFormProps>({
    mode: "onBlur",
    //or onChange 등 다양한 mode 가 있다. -> 입력이 바뀔 때 마다, 또는 입력이 완료된 시점 등 언제 체크할 지 설정하는 것
  });
  const onValid = (data: LoginFormProps) => {
    console.log("im valid bby");
    setError("username", { message: "~~" });
  };
  const onInValid = (error: FieldErrors) => {
    console.log(error);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "User name is required",
          minLength: {
            message: "5글자로 작성해야 합니다.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "이메일은 필수항목입니다.",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "지메일 가입은 어렵다.",
          }, //gmail이 포함되어 잇으면 에러 반환
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
