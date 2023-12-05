import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
// import BottomNavigation from '@mui/material/BottomNavigation'
// import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Typography from '@mui/material/Typography'
// import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
// import ReorderIcon from '@mui/icons-material/Reorder'
import AddIcon from '@mui/icons-material/Add'

type ListItem = {
  label: string
  needed: boolean
}

type List = {
  name: string
  items: ListItem[]
}

function ListOfLists({ lists }: { lists: List[] }) {
  return (
    <ul>
      {lists.map((list) => (
        <li>{list.name}</li>
      ))}
    </ul>
  )
}

function ListDetail({ list }: { list: List }) {
  return <div>{list.name}</div>
}

function App() {
  // const [bottomNav, setBottomNav] = useState(0)
  const [lists, setLists] = useState<List[]>([])
  const [selectedList, setSelectedState] = useState<number | null>(null)
  const [showListForm, setShowListForm] = useState<boolean>(false)
  const [newListName, setNewListName] = useState<string>('')

  useEffect(() => {
    const storedLists = localStorage.getItem('storedLists')
    if (storedLists) {
      setLists(JSON.parse(storedLists))
    }
  }, [])

  useEffect(() => {
    if (lists.length) {
      localStorage.setItem('storedLists', JSON.stringify(lists))
    }
  }, [lists])

  const handleCreateList = () => {
    const newList: List = {
      name: newListName,
      items: [],
    }
    setLists([...lists, newList])
    setNewListName('')
    setShowListForm(false)
  }

  return (
    <Container sx={{ height: '100vh' }}>
      <Typography>ReList</Typography>
      {lists.length > 0 && <ListOfLists lists={lists} />}
      {selectedList && <ListDetail list={lists[selectedList]} />}
      {showListForm && (
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Grid container spacing={2}>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              item
              xs={8}
            >
              <TextField
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                fullWidth
                placeholder='New List Name'
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={handleCreateList}
                variant='contained'
                size='large'
              >
                Create List
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
      {!showListForm && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 15,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Fab
            onClick={() => setShowListForm(true)}
            color='primary'
            size='small'
          >
            <AddIcon />
          </Fab>
        </Box>
      )}
      {/* <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={bottomNav}
          onChange={(event, newValue) => {
            setBottomNav(newValue)
          }}
        >
          <BottomNavigationAction label='Lists' icon={<ChecklistRtlIcon />} />
          <BottomNavigationAction label='Favorites' icon={<ReorderIcon />} />
        </BottomNavigation>
      </Paper> */}
    </Container>
  )
}

export default App
