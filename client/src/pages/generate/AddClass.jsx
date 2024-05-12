import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Add from "../../components/Add/Add";
import Tabs from "../../components/Tabs/Tabs";
import { generateTabs } from "../../data/TabsData";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Loading from "../../components/Loading";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddClass = () => {
  const [open, setOpen] = useState(false);
  const [dotCount, setDotCount] = useState(0); // State to track dot count
  const [response, setResponse] = useState(false);
  const navigate = useNavigate(); // To enable redirection
  
  // Animation interval for dots
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 5); // Cycle from 0 to 4
    }, 500); // Interval for dot animation
    return () => clearInterval(intervalId); // Cleanup
  }, []); // Runs once when component mounts

  // Backend request to generate timetable
  useEffect(() => {
    if (open && !response) {
      const url = "http://localhost:5000/api/timetables/generate/201271@students.au.edu.pk";
      axios.get(url)
        .then(response => {
          if (response.status === 200) {
            setResponse(true); // Set response to true if successful
          }
        })
        .catch(error => {
          console.error("Error during generation:", error);
        });
    }
  }, [open, response]); 
  
  
  useEffect(() => {
    if (response) {
      setTimeout(() => {
        navigate("/view"); 
      }, 3000); 
    }
  }, [response, navigate]); 

  return (
    <div className="scroll-container">
      <Tabs tabs={generateTabs} />
      <div className="generateBtnContainer">
        <button onClick={() => setOpen(true)}>Generate</button>
        <Modal
          keepMounted
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          {response ? (
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                TimeTable Generated
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2, ml: 18 }}>
                You are redirecting to View Page...
              </Typography>
            </Box>
          ) : (
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                <Loading />
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2, ml: 18 }}>
                Generating {'.'.repeat(dotCount)} {/* Display the animated dots */}
              </Typography>
            </Box>
          )}
        </Modal>
      </div>
      <Add parentName={"addClass"} />
    </div>
  );
};

export default AddClass;
