"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AppConversion = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error en la conversión");

      // Recibir la imagen como un Blob
      const blob = await response.blob();

      // Crear un enlace temporal para forzar la descarga en el navegador
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.split(".")[0]}.webp`;
      document.body.appendChild(link);
      link.click();

      // Limpieza
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al convertir la imagen.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-5">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
      />
      <Button
        onClick={handleConvert}
        disabled={!file || isConverting}
        className="bg-green-600 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {isConverting ? "Convirtiendo..." : "Convertir y Descargar"}
      </Button>
    </div>
  );
};
