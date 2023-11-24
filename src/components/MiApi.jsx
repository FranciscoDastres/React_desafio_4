import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const MiApi = (props) => {
  const [dataApi, setDataApi] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    getDataApi();
  }, []);

  const getDataApi = async () => {
    const url = "https://api.victorsanmartin.com/feriados/en.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataApi(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableData = [...dataApi];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  return (
    <div className="feriados">
      <div className="list">
        <Table striped bordered hover responsive className="text-bg-light mt-3">
          <thead>
            <tr>
              <th
                className="bg-secondary text-light fs-5 text-center"
                onClick={() => handleSort("title")}
              >
                Nombre
              </th>
              <th
                className="bg-secondary text-light fs-5 text-center"
                onClick={() => handleSort("date")}
              >
                Fecha
              </th>
              <th
                className="bg-secondary text-light fs-5 text-center"
                onClick={() => handleSort("extra")}
              >
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            {props.buscarPor === ""
              ? sortedData().map((feriado, index) => (
                  <tr key={index}>
                    <td>{feriado.title}</td>
                    <td>
                      {feriado.date.split("-")[2] +
                        "/" +
                        feriado.date.split("-")[1] +
                        "/" +
                        feriado.date.split("-")[0]}
                    </td>
                    <td>{feriado.extra}</td>
                  </tr>
                ))
              : sortedData()
                  .filter(
                    (feriado) =>
                      feriado.title
                        .toLowerCase()
                        .includes(props.buscarPor.toLowerCase()) ||
                      feriado.date
                        .toLowerCase()
                        .includes(props.buscarPor.toLowerCase()) ||
                      feriado.extra
                        .toLowerCase()
                        .includes(props.buscarPor.toLowerCase())
                  )
                  .map((feriado, index) => (
                    <tr key={index}>
                      <td>{feriado.title}</td>
                      <td>
                        {feriado.date.split("-")[2] +
                          "/" +
                          feriado.date.split("-")[1] +
                          "/" +
                          feriado.date.split("-")[0]}
                      </td>
                      <td>{feriado.extra}</td>
                    </tr>
                  ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MiApi;