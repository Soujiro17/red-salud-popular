import { clsx } from "clsx";
import { useId } from "react";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import styles from "./form_group.module.css";
import { TextArea } from "../TextArea";

export function FormGroup({
  label = "",
  type = "text",
  // labelWidth,
  order = "column",
  title = "",
  options = [],
  width = "",
  tooltip = "",
  minHeight = "",
  defaultSelectMessage = "",
  write = false,
  maxLength,
  disableDefault = false,
  ...rest
}) {
  const id = useId();

  let input = (
    <Input {...rest} maxLength={maxLength} title={title} type={type} id={id} />
  );

  if (type === "select") {
    input = (
      <Select
        {...rest}
        title={title}
        type={type}
        id={id}
        options={options}
        width={width}
        disableDefault={disableDefault}
        defaultSelectMessage={defaultSelectMessage}
        write={write}
        maxLength={maxLength}
      />
    );
  }

  if (type === "textarea") {
    input = (
      <TextArea {...rest} id={id} minHeight={minHeight} maxLength={maxLength} />
    );
  }

  const formGroupClassName = clsx({
    [styles.form_group]: true,
    [styles.column]: order === "column",
    [styles.row]: order === "row",
  });

  const style = {
    width,
  };

  return (
    <div className={formGroupClassName} style={style}>
      <label htmlFor={id}>{label}</label>
      {input}
      {tooltip ? <span>{tooltip}</span> : null}
    </div>
  );
}
