import React from 'react';
import {Table,Button,Input,Tooltip,Tag,Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './App.css';
import http from './http/http';


 class App extends React.Component{

  state = {
    visible:false,
    DataList:[],
    columns: [
       {
           title: '名称',
           dataIndex: 'name',
           key: 'name',
           align:'center',
          //  width:"15%",
       },
       {
           title: '描述',
           dataIndex: 'description',
           key: 'description',
           align:'center',
           width:"300px", 
           render:(text)=>(
           <Tooltip title={text}> <div className='description'>
            {text}
          </div></Tooltip>
           )
       },
       {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        align:'center',
        render:(text)=>(
           <img src={text} alt='' />
          )
    },{
      title:"链接",
      dataIndex:"baseURL",
      key:"baseURL",
      align:'center',
      render:(text)=>(
      <a href={text}>{text}</a>
       )
    },{
      title:"标签",
      dataIndex:"tags",
      key:"tags",
      align:'center',
      render:(text)=>(
         
           text.map((item,index) =>{
             return(
               <Tag color="magenta" key={index}>
                  {item}
               </Tag>
             )
           })
         
         )
    },
       {
           title: '操作',
           align:'center',
           render: (text, record) => (
               <div>
                   <Button type="primary" onClick={this.Look.bind(this,record.properties)}>查看详情</Button>
                
               </div>
           ),
       },
   ],
   tabCol:[
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
     //  width:"15%",
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
   //  width:"15%",
},
   ],
   data:[]
  }
  getDataList=()=>{

    http.get("/v2/5ea28891310000358f1ef182",null).then((res)=>{
      console.log(res.data)
      var {DataList} = this.state;
      DataList = res.data.apis;
      this.setState({DataList})
    })

  }

  componentWillMount(){
    this.getDataList();
  }
  Look(value){
    this.setState({
      visible:true,
      data:value
    })
     console.log(value)
  }
  handleOk = e => {

    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
 
    this.setState({
      visible: false,
    });
  };
  getValue=(e)=>{
       
  }
  render(){
    
    return(
      <div className="App">
        <Modal
          title="详情"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="50%"
        >
          <Table columns={this.state.tabCol} dataSource={this.state.data} bordered pagination={{pageSize:5}}/>
        </Modal>
         <div style={{ marginTop: "20px",width:"30%"}}>
         <Input size="large" placeholder="搜索tag" prefix={<SearchOutlined />} onChange={this.getValue} />
         </div>
        <div style={{ marginTop: "20px" }}> <Table columns={this.state.columns} dataSource={this.state.DataList} bordered pagination={{pageSize:5}}/></div>
       <div>
         {/* <div style={{borderBottom:"1px solid #f1f1f1",padding:"10px",fontSize:"20px",fontWeight:"bold"}}>
           table是一个antd table组件绑定的column对象。看这段对象定义，你觉得是否有优化的空间？如果有你会怎么做？请写出你的列对象。
         </div>
         {/* <div style={{ marginTop: "20px" }}>
           <h1 style={{color:"red"}}>
           它是有优化空间滴!!! 
           </h1>
         
         </div> */}
         <div> 

         </div>
       </div>
      </div>
    )

  }

}


export default App;
