import swal from 'sweetalert2'
import axios from 'axios'


export const pokeData = async(data) => {
    try {
        const response = await axios.post('http://localhost:3000/analyze', { input: data });
        return response.data;
    } catch (error) {
        console.error("Error al analizar:", error);
        return null;
    }
};