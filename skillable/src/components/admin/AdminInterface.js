import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  InputAdornment,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

const AdminInterface = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [teacherName, setTeacherName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Base URL for API
  const API_BASE_URL = 'http://localhost:8080/api';
  
  // Get the auth token from localStorage
  const getAuthToken = () => localStorage.getItem('token');
  const getUserEmail = () => localStorage.getItem('userEmail');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/non-teachers`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Error fetching users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Pre-fill teacher name with user's email (without domain)
    const emailName = user.email.split('@')[0];
    setTeacherName(emailName);
  };

  const handlePromoteUser = async () => {
    if (!selectedUser || !teacherName.trim()) {
      setError('Please select a user and provide a teacher name');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/promote-to-teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          name: teacherName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to promote user');
      }

      const result = await response.text();
      setSuccessMessage(result);
      setSelectedUser(null);
      setTeacherName('');
      
      // Refresh the user list
      fetchUsers();
    } catch (err) {
      setError('Error promoting user: ' + err.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Promote Users to Teachers
      </Typography>
      
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Select any registered user to promote them to teacher status. Users can have any email domain (@gmail.com, @yahoo.com, etc.).
      </Typography>
      
      {/* Search and refresh section */}
      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          placeholder="Search users by email..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: "10px" }}
        />
        <Button
          variant="outlined"
          startIcon={<RefreshIcon fontSize="small" />}
          onClick={fetchUsers}
        >
          Refresh
        </Button>
      </Box>
      
      {/* Error and success messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      {/* Users table */}
      <TableContainer component={Paper} sx={{ mb: 4, borderRadius: "10px" }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell width="60px"></TableCell>
              <TableCell>Email</TableCell>
              <TableCell width="100px">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    {searchTerm ? 'No users matching your search' : 'No users available'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow 
                  key={user.id}
                  selected={selectedUser && selectedUser.id === user.id}
                  sx={{ 
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(74, 108, 247, 0.08)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Radio
                      checked={selectedUser && selectedUser.id === user.id}
                      onChange={() => handleUserSelect(user)}
                    />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleUserSelect(user)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Promotion form */}
      {selectedUser && (
        <Card sx={{ borderRadius: "10px", bgcolor: '#f8f9fa', mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Promote User to Teacher
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Selected User:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {selectedUser.email}
              </Typography>
            </Box>
            
            <TextField
              label="Teacher Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              sx={{ 
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                }
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedUser(null);
                  setTeacherName('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon fontSize="small" />}
                onClick={handlePromoteUser}
                sx={{ 
                  backgroundColor: "#4a6cf7",
                  "&:hover": {
                    backgroundColor: "#3a5ce5"
                  }
                }}
              >
                Promote to Teacher
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AdminInterface;