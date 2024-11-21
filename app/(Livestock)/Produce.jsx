export default function Produce({}){
    const [ProduceData, setProduceData] = useState([]);
    const [formData, setFormData] = useState({
      breed: '',
      purchaseDate: '',
     
    });
    const [selectedLivestock, setSelectedLivestock] = useState(null);
    const [viewMode, setViewMode] = useState('list'); 
  
   
    const renderLivestockList = () => (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Livestock List</Text>
        </View>
        {livestockData.length > 0 ? (
          <FlatList
            data={livestockData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setSelectedLivestock(item);
                  setViewMode('details');
                }}
              >
                <Text>{item.breed}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>No livestock added yet.</Text>
        )}
        
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setViewMode('add')}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );

}