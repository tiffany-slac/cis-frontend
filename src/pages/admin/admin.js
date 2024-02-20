import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { fetchUsers } from '../../services/api'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import './admin.css';

const roles = ['CIS', 'CWM', 'ELOG'];

const EditToolbar = ({ setRows, setRowModesModel }) => {
  const handleClick = () => {
    const id = randomId();
    setRows(oldRows => [...oldRows, { id, name: '', email: '', role: [], isNew: true }]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUsers();
        const usersWithIds = data.map((user, index) => ({
          id: index + 1,
          name: user.uid,
          email: user.mail,
          role: [], // Initially no role selected
        }));
        setUsers(usersWithIds);
        setRows(usersWithIds);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        // Handle error accordingly
      }
    };
  
    fetchUser();
  }, []);
  

  useEffect(() => {
    if (activeTab) {
      history.push(`/${activeTab.toLowerCase()}`);
    } else {
      history.push('/admin');
    }
  }, [activeTab, history]);

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = id => () => {
    setRows(rows => rows.filter(row => row.id !== id));
  };

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find(row => row.id === id);
    if (editedRow.isNew) {
      setRows(rows => rows.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows => rows.map(row => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    {
      field: 'role',
      headerName: 'User Role',
      width: 200,
      renderCell: (params) => (
        <Autocomplete
          multiple
          id="user-role"
          options={roles}
          value={params.value}
          onChange={(event, newValue) => {
            const id = params.id;
            const updatedRows = rows.map((row) => {
              if (row.id === id) {
                return { ...row, role: newValue };
              }
              return row;
            });
            setRows(updatedRows);
          }}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 130,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="general-admin">
      <div className="dropdown">
        <button className="admin-dropbtn" onClick={() => setActiveTab(null)}>
          Select Admin
        </button>
        <div className="admin-dropdown">
          <button onClick={() => setActiveTab('CISadmin')}>CIS</button>
          <button onClick={() => setActiveTab('CWMadmin')}>CWM</button>
          <button onClick={() => setActiveTab('ELOGadmin')}>ELOG</button>
        </div>
      </div>
      <h1>Admin Dashboard</h1>
      <>
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      </>
    </div>
  );
};

export default Admin;
