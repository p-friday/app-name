import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AuthProvider from '../Auth/AuthProvider';

interface Item {
  id: number;
  accountId: number;
  isPublic: boolean;
  startDate: Date;
  endDate: Date;
}

const YourComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = AuthProvider();
  const [cookies] = useCookies(['authToken']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://tripplaner.somee.com/api/Trip/all', {
          headers: auth,
        });
        if (response.status === 200) {
          const data = response.data;

          if (Array.isArray(data)) {
            console.log('Dane z serwera:', data);
            setItems(data);
          } else {
            console.error('Błąd: Otrzymane dane nie są tablicą.');
            setItems([]);
          }
        } else {
          console.error('Błąd podczas pobierania danych:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        setErrorMessage('Wystąpił błąd podczas pobierania danych.');
      }
    };

    fetchData();
  }, [auth]);

  const confirmToggleIsPublic = async (itemId: number, isPublic: boolean) => {
    const confirmed = window.confirm(`Czy na pewno chcesz zmienić status publiczności?`);
    if (confirmed) {
      toggleIsPublic(itemId, isPublic);
    }
  };

  const toggleIsPublic = async (itemId: number, isPublic: boolean) => {
    try {
      const response = await axios.put(
        `http://tripplaner.somee.com/api/Trip/share/${itemId}/${!isPublic}`,
        {},
        { headers: auth }
      );

      if (response.status === 200) {
        const updatedData = response.data;

        if (Array.isArray(updatedData)) {
          setItems(updatedData);
        } else {
          console.error('Błąd: Otrzymane zaktualizowane dane nie są tablicą.');
        }
      } else {
        console.error('Błąd podczas zapisywania zmian na serwerze');
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania zmian na serwerze:', error);
      setErrorMessage('Wystąpił błąd podczas zapisywania zmian.');
    }
  };

  return (
    <div>
      <h1>Lista planów</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Account ID</TableCell>
              <TableCell>Is Public</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.accountId}</TableCell>
                <TableCell>{item.isPublic ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => confirmToggleIsPublic(item.id, item.isPublic)}>
                    {item.isPublic ? 'Set to Private' : 'Set to Public'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default YourComponent;
