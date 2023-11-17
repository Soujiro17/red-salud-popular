/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  useState,
  useRef,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./select.module.css";
import { InputWithIcon } from "../InputWithIcon";

const SelectContext = createContext({
  onChange: () => {},
  value: "",
});

export function SelectOption({
  children,
  value,
  disabled = false,
  disabledMessage,
}) {
  const { value: actualValue, onChangeValue } = useContext(SelectContext);

  const selectClassName = clsx({
    [styles.select_option]: true,
    [styles.disabled]: disabled,
  });

  return (
    <div
      onClick={
        disabled
          ? () => (disabledMessage ? toast.error(disabledMessage) : "")
          : () => onChangeValue(value)
      }
      role="option"
      aria-selected={actualValue === value}
      className={selectClassName}
    >
      <span>
        {value === actualValue && (
          <Image
            src="/icons/check2.svg"
            alt="selected icon"
            className={styles.selected_icon}
            width={18}
            height={18}
          />
        )}
      </span>
      <p>{children}</p>{" "}
      {disabled && disabledMessage ? (
        <p style={{ marginLeft: ".5rem" }}>
          {"-  "}
          {disabledMessage}
        </p>
      ) : null}
      {/* <span>
        {disabledMessage ? `- ${disabledMessage}` : ""}
      </span> */}
    </div>
  );
}

export function Select({
  onChange = () => {},
  options = [],
  width,
  defaultSelectMessage = "",
  write = false,
  maxLength,
  disableDefault = false,
  placeholder = "",
  name,
  value: startValue,
}) {
  const [value, setValue] = useState("");
  const [toFind, setToFind] = useState(startValue || "");
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

  const selectRef = useRef(null);

  const handleOpen = () => setOpen(!open);
  const handleToFind = (e) => setToFind(e.target.value);

  const onChangeValue = (val) => {
    setValue(val);
    setToFind(val);
    onChange(val);
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      setOpen(!open);
    }
  };

  const handleOutsideClick = (event) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target) &&
      open
    ) {
      setOpen(false);
    }
  };

  const stateValues = useMemo(() => ({ value, onChangeValue }), [value]);

  const optionMap = (option) => (
    <SelectOption
      key={option.value}
      value={option.value}
      disabled={option.disabled}
      disabledMessage={option.disabledMessage}
    >
      {option.label}
    </SelectOption>
  );

  const optionFilter = (option) =>
    option.value?.toLowerCase().includes(toFind.toLocaleLowerCase());

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top, width: rect.width });
    }
  }, [selectRef]);

  useEffect(() => {
    if (toFind && value !== toFind) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [toFind]);

  useEffect(() => {
    if (!startValue) {
      setToFind("");
    }
  }, [startValue]);

  return (
    <SelectContext.Provider value={stateValues}>
      {write ? (
        <InputWithIcon
          name={name}
          parentRef={selectRef}
          value={toFind}
          onChange={handleToFind}
          iconSrc="/icons/search.svg"
          placeholder={placeholder}
          maxLength={maxLength}
          width="100%"
        />
      ) : (
        <div
          ref={selectRef}
          role="button"
          aria-label={defaultSelectMessage || "Selecciona una opción"}
          className={clsx(styles.select_container, styles.select_pos)}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {options.find((option) => option.value === value)?.label ||
            "Selecciona una opción"}
          <Image
            className={styles.select_icon}
            src="/icons/code.svg"
            alt="chevron"
            width={20}
            height={20}
            style={{ opacity: open ? 1 : 0.4 }}
          />
        </div>
      )}
      {open &&
        createPortal(
          <div
            role="listbox"
            aria-label={defaultSelectMessage || "Selecciona una opción"}
            className={clsx(styles.select_options, styles.select_container)}
            style={{
              top: position.y + 40,
              left: position.x,
              width: width || position.width,
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {disableDefault ? null : (
              <SelectOption disabled value="" disabledMessage="">
                {defaultSelectMessage || "Selecciona una opción"}
              </SelectOption>
            )}
            {options.length > 0 ? (
              write ? (
                options.filter(optionFilter).length > 0 ? (
                  options.filter(optionFilter).map(optionMap)
                ) : (
                  <p style={{ margin: ".3rem" }}>
                    No hay resultados en tu búsqueda
                  </p>
                )
              ) : (
                options.map(optionMap)
              )
            ) : (
              <p title="tooltip-text" onClick={handleOpen}>
                No hay opciones para mostrar
              </p>
            )}
          </div>,
          document.getElementById("modal"),
        )}
    </SelectContext.Provider>
  );
}
