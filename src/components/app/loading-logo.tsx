"use client";

import type React from "react";

import { useState, useEffect } from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "fullscreen" | "inline" | "modal";
  message?: string;
  showProgress?: boolean;
}

const AnimatedLogo: React.FC<{ size: string }> = ({ size }) => {
  const sizeClasses = {
    sm: "w-32 h-12",
    md: "w-48 h-16",
    lg: "w-64 h-20",
    xl: "w-80 h-24",
  };

  return (
    <div
      className={`${sizeClasses[size as keyof typeof sizeClasses]} relative`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 120"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="animate-fade-in"
      >
        {/* Fundo da logo */}
        <rect
          width="400"
          height="120"
          rx="20"
          fill="#0F172A"
          className="opacity-95"
        />

        <g transform="translate(30,30)">
          {/* Círculo azul com animação suave */}
          <circle
            cx="20"
            cy="30"
            r="10"
            fill="#38BDF8"
            className="animate-pulse-slow"
          />

          {/* Círculo amarelo com animação suave */}
          <circle
            cx="50"
            cy="30"
            r="10"
            fill="#FBBF24"
            className="animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />

          {/* Conexões com animação sutil */}
          <path
            d="M20 40 C25 50, 45 50, 50 40"
            stroke="#94A3B8"
            strokeWidth="3"
            fill="none"
            className="animate-fade-in-slow"
          />
          <path
            d="M20 20 C25 10, 45 10, 50 20"
            stroke="#94A3B8"
            strokeWidth="3"
            fill="none"
            className="animate-fade-in-slow"
            style={{ animationDelay: "0.5s" }}
          />
        </g>

        {/* Texto da marca */}
        <text
          x="100"
          y="75"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="36"
          fill="#FFFFFF"
          className="animate-fade-in-slow"
        >
          Collab
          <tspan fill="#38BDF8">Dev</tspan>
        </text>
      </svg>
    </div>
  );
};

const LoadingDots: React.FC = () => (
  <div className="flex space-x-2 justify-center items-center">
    <div
      className="w-2 h-2 bg-sky-500 rounded-full animate-bounce-gentle"
      style={{ animationDelay: "0ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-sky-500 rounded-full animate-bounce-gentle"
      style={{ animationDelay: "200ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-sky-500 rounded-full animate-bounce-gentle"
      style={{ animationDelay: "400ms" }}
    ></div>
  </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full max-w-md mx-auto">
    <div className="w-full bg-slate-200 rounded-full h-1.5">
      <div
        className="bg-gradient-to-r from-sky-400 to-sky-600 h-1.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p className="text-xs text-slate-500 mt-2 text-center opacity-75">
      {Math.round(progress)}%
    </p>
  </div>
);

export default function LoadingComponent({
  size = "lg",
  variant = "fullscreen",
  message = "Carregando...",
  showProgress = false,
}: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(message);

  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [showProgress]);

  useEffect(() => {
    const messages = [
      "Carregando...",
      "Preparando ambiente...",
      "Conectando...",
      "Sincronizando...",
      "Quase pronto...",
    ];

    const interval = setInterval(() => {
      setLoadingMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerClasses = {
    fullscreen:
      "fixed inset-0 bg-white bg-opacity-98 backdrop-blur-sm z-50 flex flex-col items-center justify-center",
    inline: "flex flex-col items-center justify-center p-8",
    modal:
      "flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-2xl border border-slate-100",
  };

  return (
    <div className={containerClasses[variant]}>
      <div className="flex flex-col items-center space-y-8">
        {/* Logo animada */}
        <div className="relative">
          <AnimatedLogo size={size} />
        </div>

        {/* Mensagem de loading */}
        <div className="text-center space-y-4">
          <p className="text-base font-medium text-slate-600 transition-all duration-500">
            {loadingMessage}
          </p>
          <LoadingDots />
        </div>

        {/* Barra de progresso opcional */}
        {showProgress && (
          <div className="w-full max-w-sm">
            <ProgressBar progress={progress} />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-slow {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-slow {
          animation: fade-in-slow 1.5s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Componentes especializados para casos específicos
export const FullscreenLoader: React.FC<{ message?: string }> = ({
  message,
}) => <LoadingComponent variant="fullscreen" size="xl" message={message} />;

export const InlineLoader: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => <LoadingComponent variant="inline" size={size} />;

export const ModalLoader: React.FC<{ showProgress?: boolean }> = ({
  showProgress = false,
}) => (
  <LoadingComponent variant="modal" size="lg" showProgress={showProgress} />
);
