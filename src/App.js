import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            list: []
        }
    }

    query = () => {
        axios.get('/user').then(({data})=>{
           this.setState({
               list:data
           })
        });
    }

    componentDidMount() {
        this.query();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.name !== '') {
            axios.post('/user', {
                id: !this.state.id ? '' : this.state.id,
                name: this.state.name
            }).then(({data})=>{
                this.setState({
                    id: '',
                    name: ''
                });
                this.query();
            })
        }
    }

    deleteItem = (item) => {
        axios.delete(`/user/${item.id}`).then(({data}) => {
            this.query();
        })
    }

    render() {
        return (
            <div className="container-fluid" style={{marginTop: '20px'}}>
                <div className="row">
                    <div className="col-md-5 col-md-offset-1">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>用户名</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.list.map(item=>{
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={()=>{
                                                            this.setState({id: item.id, name: item.name})
                                                        }}>编辑</button>
                                                        <button className="btn btn-danger" style={{marginLeft:'5px'}}
                                                            onClick={()=>{
                                                                this.deleteItem(item)
                                                            }}
                                                        >删除</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-md-offset-1">
                        <div className="card">
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-md-3">用户名</label>
                                        <div className="col-md-8">
                                            <input type="text" id="name" className="form-control" value={this.state.name} onChange={
                                                (e)=>{
                                                    this.setState({
                                                        name: e.target.value
                                                    })
                                                }
                                            }/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-offset-2 col-md-10">
                                            <button className="btn btn-danger" onClick={this.handleFormSubmit}>提交</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
