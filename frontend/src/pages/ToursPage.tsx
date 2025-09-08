import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Can } from '../components/Can';

type Tour = {
  id: string;
  nombre: string;
  destino: string;
  precio: number;
  descripcion: string;
  fecha_inicio: string;
};

type TourFormData = Omit<Tour, 'id'>;

const TourForm = ({
  tour,
  onSave,
  onCancel,
}: {
  tour?: Tour | null;
  onSave: (data: TourFormData) => void;
  onCancel: () => void;
}) => {
  const [data, setData] = useState<TourFormData>({
    nombre: tour?.nombre || '',
    destino: tour?.destino || '',
    precio: tour?.precio || 0,
    descripcion: tour?.descripcion || 'Descripción de ejemplo',
    fecha_inicio: tour?.fecha_inicio || new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: name === 'precio' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{tour ? 'Editar' : 'Crear'} Tour</h2>
        <form onSubmit={handleSubmit}>
          <input name="nombre" value={data.nombre} onChange={handleChange} placeholder="Nombre" className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
          <input name="destino" value={data.destino} onChange={handleChange} placeholder="Destino" className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
          <input name="precio" type="number" value={data.precio} onChange={handleChange} placeholder="Precio" className="mb-6 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg">Cancelar</button>
            <button type="submit" className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ToursPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchTours = async () => {
    try {
      const response = await api.get('/tours');
      setTours(response.data);
    } catch (error) {
      console.error('Error al obtener los tours:', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSave = async (data: TourFormData) => {
    try {
      if (editingTour) {
        await api.patch(`/tours/${editingTour.id}`, data);
      } else {
        await api.post('/tours', data);
      }
      setEditingTour(null);
      setIsCreating(false);
      fetchTours();
    } catch (error) {
      console.error("Error al guardar el tour:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tour?')) {
      try {
        await api.delete(`/tours/${id}`);
        fetchTours();
      } catch (error) {
        console.error("Error al eliminar el tour:", error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Tours</h1>
        <Can perform="create" on="Tour">
          <button onClick={() => setIsCreating(true)} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
            Crear Tour
          </button>
        </Can>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Destino</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-600">{tour.nombre}</td>
                <td className="py-3 px-4 text-gray-600">{tour.destino}</td>
                <td className="py-3 px-4 text-gray-600 flex gap-2">
                  <Can perform="update" on="Tour">
                    <button onClick={() => setEditingTour(tour)} className="text-yellow-600 hover:underline">Editar</button>
                  </Can>
                  <Can perform="delete" on="Tour">
                    <button onClick={() => handleDelete(tour.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </Can>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isCreating || editingTour) && (
        <TourForm
          tour={editingTour}
          onSave={handleSave}
          onCancel={() => {
            setIsCreating(false);
            setEditingTour(null);
          }}
        />
      )}
    </div>
  );
};