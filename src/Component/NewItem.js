import { useState, React } from "react";

const data = [
    {
        kieu: 'b',
        data: 'vhhfvbsjhvbbhbhbhbfhbvshjfdsvsfvsdfvfdvdfvdfvdfvfvfvsdvdsf'
    },
    {
        kieu: 'n',
        data: 'vhhfvbsjhvbbhbhbhbfhbvshjfdbjhbjhbjhbjbjhbjhbhjbhbhbhbhbhhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhbhhbhbjnjnjnjnjnbhbscbhcbhcgchbhbcmcjhgcgchbchjsbcjhsbcjhbsvsfvsdfvfdvdfvdfvdfvfvfvsdvdsf'
    },
    {
        kieu: 'img',
        data: '../../Assets/Image/logo.png'
    }, {
        kieu: 'i',
        data: 'vhhfvbsjhvbbhbhbhbfhbvshjfdsvsfvsdfvfdvdfvdfvdfvfvfvsdvdsf'
    }, {
        kieu: 'u',
        data: 'vhhfvbsjhvbbhbhbhbfhbvshjfdsvsfvsdfvfdvdfvdfvdfvfvfvsdvdsf'
    },
];



const NewItem = () => {




    return (
        <>
            <div className="show-new">
                {
                    data.map(n => {
                        if (n.kieu == 'n')
                            return <div >{n.data}</div>
                        else if (n.kieu == 'b')
                            return <div style={{ fontWeight: "bolder" }}>{n.data}</div>
                        else if (n.kieu == 'i')
                            return <div style={{ fontStyle: 'italic' }}>{n.data}</div>
                        else if (n.kieu == 'u')
                            return <div style={{ textDecorationLine: 'underline' }}>{n.data}</div>
                        else
                            return (
                                <div>
                                    <img style={{height:1000,width:500}} src={n.data} />
                                </div>
                            )

                    })
                }
            </div>
        </>
    )
}

export default NewItem;