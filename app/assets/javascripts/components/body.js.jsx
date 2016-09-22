var Body = React.createClass({
  getInitialState(){
    return {items: []}
  },
  
  componentDidMount(){
    $.getJSON('items.json', (response) => {this.setState({items: response})})
  },
  
  handleSubmit(item) {
    var newState = this.state.items.concat(item);
    this.setState({ items: newState })
  },
  
  handleDelete(id) {
    $.ajax({
      url: `items/${id}`,
      type: 'delete',
      success:() => {
       this.removeItemClient(id) 
      }
    });
  },
  
  handleUpdate(item){
    $.ajax({
      url: `items/${item.id}`,
      type: 'put',
      data: {item: item},
      success: () => {
        this.updateItems(item)
      }
      
    })
  },
  
  updateItems(item){
    var items = this.state.items.filter((i) => {
      return i.id != item.id;
    })
    items.push(item)
    this.setState({items: items});
  },
  
  removeItemClient(id){
    var newItems = this.state.items.filter((item) => {
      return item.id != id;
    });
    
    this.setState({ items: newItems });
    
  },
  
  render(){
    return(
      <div>
        <NewItem handleSubmit={this.handleSubmit}/>
        <AllItems items={this.state.items} handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
      </div>
    )
  }
});