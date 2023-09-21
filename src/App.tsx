import { useState, useEffect } from 'react'
import './App.css'
import { useForm, SubmitHandler, Controller } from "react-hook-form"

type Inputs = {
  id: number
  codigo: string
  descripcion: string
  precio: number
  marca: string
  categoria: number
  version: number
}

export default function App() {
  const { handleSubmit, control, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async datos => {
    try {
      console.log(datos)

      const { id, codigo, descripcion, precio, categoria, version, marca } = datos;
      const res = 
        await fetch(`http://localhost:8080/producto?idProducto=${id}codigo=${codigo}&descripcion=${descripcion}&precio=${precio}&idCategoria=${categoria}&version=${version}&marca=${marca}`, {
      method: 'PUT', 
    });

      if (!res.ok) {
        const error = await res.text();
        setErrores(error);
        return;
      } 

      const data = await res.text();
      setSuccess(data)

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }
  
  const [errores, setErrores] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const getProducto = async function fetchData() {
    try {
      const res = await fetch(`http://localhost:8080/producto/{id}?id=1`);
      if (!res.ok) {
        const error = await res.text();
        setErrores(error);
        return;
      } 

      const data = await res.json();
      reset(data)

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  useEffect(() => {
    getProducto();
  }, []);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    
      <Controller
        name="id" 
        control={control}
        render={({ field }) => (
          <input {...field} hidden/>
        )}
      />

      <Controller
        name="codigo" 
        control={control}
        render={({ field }) => (
          <input {...field} hidden/>
        )}
      />

      <label htmlFor="">Nombre: </label>
      <Controller
        name="descripcion" 
        control={control}
        render={({ field }) => (
          <input {...field}/>
        )}
      />
    
      <div>
        <label htmlFor="">Precio: </label>
        <Controller
          name="precio" 
          control={control}
          render={({ field }) => (
          <input {...field}/>
          )}
        />
      </div>


      {/*esto tiene que ser un select normal*/}
      <div>
        <label htmlFor="">Categoria: </label>
        <Controller
          name="categoria"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <select {...field}>
              <option>Ropa deportiva</option>
            </select>
          )}
        />
      </div>

      <Controller
        name="version" 
        control={control}
        render={({ field }) => (
          <input {...field} hidden/>
        )}
      />

      <div>
       <label htmlFor="">Marca: </label>
       <Controller
          name="marca" 
          control={control}
          render={({ field }) => (
          <input {...field}/>
          )}
        />
      </div>

      <input type="submit" />

      {errores && <span style={{ color: 'red' }}>Errores: {errores}</span>}
      {success && <span style={{ color: 'green' }}>{success}</span>}
    </form>
  )
}
