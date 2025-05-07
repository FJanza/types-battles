import React, {useState, useEffect, useRef} from "react";

import {TeclaProps} from "./types";

const Tecla = ({tecla}: TeclaProps) => {
  return (
    <button
      data-key={tecla}
      className={`pointer-events-none bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded shadow cursor-pointer transition-transform duration-100 ease-in-out
        ${tecla === "MAYÚS" ? "w-32" : ""}
        ${tecla === " " ? "w-full" : ""}
        ${
          tecla === "  "
            ? "w-44 bg-transparent border-transparent shadow-none"
            : ""
        }
      `}
    >
      {tecla}
    </button>
  );
};

const EnterTecla = () => {
  return (
    <button
      data-key="ENTER"
      className="pointer-events-none absolute bg-gray-200 border border-gray-300 text-gray-700 rounded shadow cursor-pointer transition-transform duration-100 ease-in-out w-20 h-[114px] flex items-center justify-center"
      style={{bottom: "94px", right: "-2px"}}
    >
      ENTER
    </button>
  );
};

const LoadingTyping = () => {
  const teclasData: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["MAYÚS", "Z", "X", "C", "V", "B", "N", "M", ",", "."],
    ["  ", " ", "  "],
  ];

  const frases: string[] = ["type-battle", "click-battle"];
  const [fraseActualIndex, setFraseActualIndex] = useState<number>(0);
  const [letraActualIndex, setLetraActualIndex] = useState<number>(0);
  const [textoEscrito, setTextoEscrito] = useState<string>("");
  const intervaloEntreLetras: number = 200;
  const intervaloEntreFrases: number = 1000;
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);
  const fraseTimeout = useRef<NodeJS.Timeout | null>(null);
  const initialTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tecladoContainerRef = useRef<HTMLDivElement | null>(null);

  const animarTecla = (key: string): void => {
    const teclaElement = document.querySelector<HTMLButtonElement>(
      `[data-key="${key.toUpperCase()}"]`
    );
    if (teclaElement) {
      teclaElement.classList.add("animate-presionarTecla");
      setTimeout(() => {
        teclaElement.classList.remove("animate-presionarTecla");
      }, 300);
    }
    setTextoEscrito((prevTexto) => prevTexto + key);
  };

  // const animarEnter = (): void => {
  //   const enterElement =
  //     document.querySelector<HTMLButtonElement>(`[data-key="ENTER"]`);
  //   if (enterElement) {
  //     enterElement.classList.add("animate-presionarTecla");
  //     setTimeout(() => {
  //       enterElement.classList.remove("animate-presionarTecla");
  //     }, 300);
  //   }
  // };

  const teclearFrase = (): void => {
    const fraseActual = frases[fraseActualIndex];
    const letraActual = fraseActual[letraActualIndex];

    if (letraActual) {
      const textoEscritoElement = document.getElementById("texto-escrito");
      if (textoEscritoElement) {
        textoEscritoElement.style.color =
          letraActualIndex === fraseActual.length - 1 ? "green" : "gray";
      }
      animarTecla(letraActual);
      setLetraActualIndex((prevIndex) => prevIndex + 1);
      animationTimeout.current = setTimeout(teclearFrase, intervaloEntreLetras);
    } else {
      fraseTimeout.current = setTimeout(() => {
        setFraseActualIndex(() => (Math.random() < 0.88 ? 0 : 1));
        setLetraActualIndex(0);
        setTextoEscrito("");
        // Reiniciar la animación para la siguiente frase
        if (animationTimeout.current) {
          clearTimeout(animationTimeout.current);
          animationTimeout.current = null;
        }
        initialTimeoutRef.current = setTimeout(
          teclearFrase,
          intervaloEntreFrases
        );
      }, intervaloEntreFrases);
    }
  };

  useEffect(() => {
    // Iniciar la secuencia de tecleo después de un breve retraso inicial
    initialTimeoutRef.current = setTimeout(teclearFrase, 500);

    // Limpiar los timeouts cuando el componente se desmonta
    return () => {
      if (initialTimeoutRef.current) {
        clearTimeout(initialTimeoutRef.current);
      }
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
      if (fraseTimeout.current) {
        clearTimeout(fraseTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frases]);

  return (
    <div
      ref={tecladoContainerRef}
      className="relative flex flex-col items-center"
    >
      <div
        id="texto-escrito"
        className="text-xl mb-5 p-2 h-12 border border-gray-300 rounded min-w-[300px] text-center"
      >
        {textoEscrito}
      </div>
      <div className="space-y-2">
        {teclasData.map((fila, index) => (
          <div
            key={index}
            className={`flex ${
              index === teclasData.length - 1
                ? "justify-start space-x-2"
                : "space-x-2"
            }`}
          >
            {fila.map((tecla) => (
              <Tecla key={tecla} tecla={tecla} />
            ))}
          </div>
        ))}
      </div>
      <EnterTecla />
    </div>
  );
};

export default LoadingTyping;
