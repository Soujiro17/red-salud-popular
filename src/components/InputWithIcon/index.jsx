import Image from "next/image";
import { Input } from "../Input";
import styles from "./inputwithicon.module.css";

export function InputWithIcon({
  title = "",
  iconSrc = "",
  width,
  placeholder,
  onChange,
  value,
  parentRef,
  name,
  maxLength,
}) {
  return (
    <div className={styles.input_group} ref={parentRef}>
      <div className={styles.input_icon_wrapper}>
        <div className={styles.input_icon_container}>
          <Image className={styles.icon} src={iconSrc} alt="input-icon" fill />
        </div>
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        width={width}
        title={title}
        maxLength={maxLength}
        name={name}
      />
    </div>
  );
}
