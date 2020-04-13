import fetch from 'isomorphic-unfetch'

// Main Page
class Index extends React.Component {
    constructor(props){
        super(props)
    }

    static async getInitialProps(ctx) {
        const res = await fetch('http://localhost:4000/guild-list')
        const json = await res.json()
        return { data: json};
    }

    render(){

        return(
            <>
                <h1>Choose a guild</h1>

                <ul>
                    {this.props.data.map((e) => 
                        <li key={e.id}>
                            <GuildElement element={e}/>
                            <hr />
                        </li>
                    )}
                </ul>
            </>
        )
    }
}

// Guild Element
class GuildElement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            opened: 0,
        }
    }

    
    render(){
        let baseURL = this.props.element.iconURL;
        let url;

        if(baseURL){
            if(baseURL.slice(-5) == ".webp"){
                url = baseURL.slice(0,-5) + ".gif"
            }else{
                url = baseURL;
            }
        }else{
            url = "https://via.placeholder.com/128"
        }

        // Check if opened
        if(this.state.opened == 0){
            return(
                <div onClick={()=> this.setState({opened: 1})}>
                    <img src={url}/>
                    <h3>{this.props.element.name}</h3>
                    <h4>{this.props.element.memberCount} members</h4>
                </div>
            )
        }else{
            return(
                <h1>Open</h1>
            )
        }
    }
}

class GuildElement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            opened: 0,
        }
    }

    render(){
        


        return(
            <>
                <img />
            </>
        )
    }
}
export default Index