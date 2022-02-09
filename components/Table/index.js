import { DataGrid } from '@mui/x-data-grid';



const DataTable = ({ height, ischeckbox, columns , rows , num_row}) => {

 
  return <div style={{ height: height, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={num_row}
      rowsPerPageOptions={[num_row]}
      checkboxSelection={ischeckbox}
    />
  </div>;

}

export default DataTable

