import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Tabs, Tab, Container } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import AdminInterface from './AdminInterface';
import TeachersList from './TeachersList';
import Background from '../Background';
import Navbar from '../Navbar';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh", 
        width: "100%",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <Background />
      </div>
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Navbar />
        
        <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ShieldIcon sx={{ width: 32, height: 32, color: '#4a6cf7', mr: 2 }} />
            <Typography variant="h4" component="h1" fontWeight="600">
              Admin Dashboard
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            sx={{ mb: 3 }}
            onClick={() => window.location.href = '/homepage'}
          >
            Back to Home
          </Button>
          
          <Paper sx={{ 
            borderRadius: "15px", 
            overflow: 'hidden', 
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  py: 2,
                  fontWeight: 500
                }
              }}
            >
              <Tab 
                icon={<PersonAddIcon />} 
                iconPosition="start" 
                label="Promote Users" 
              />
              <Tab 
                icon={<GroupIcon />} 
                iconPosition="start" 
                label="Teachers List" 
              />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && <AdminInterface />}
              {activeTab === 1 && <TeachersList />}
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;