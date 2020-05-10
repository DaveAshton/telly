function App() {
    const { Container, Row, Col } = ReactBootstrap;
    return (
        <Container>
            <Row>
                <Col md={{ span: 12 }}>
                    <ChannelList />
                </Col>
            </Row>
        </Container>
    );
}

function ChannelList() {
    const [channels, setChannels] = React.useState(null);

    const onChannelClick = channelNumber => {
        console.warn('CLICK', channelNumber);
        fetch(`/channels/${channelNumber}`, {
            method: 'PUT',
            body: JSON.stringify({
                channelNumber,
            }),
            headers: { 'Content-Type': 'application/json' },
        }).then(j => console.warn('channel select response', j));
    };

    React.useEffect(() => {
        fetch('/channels')
            .then(result => result.json())
            .then(json => {
                console.warn('channels', json);
                setChannels(json);
            });
    }, []);

    return <Favourites channels={channels} onChannelClick={onChannelClick} />;
}

function ChannelButton({ num, channel, onClick }) {
    const { Button } = ReactBootstrap;
    return (
        <Button
            variant="primary"
            onClick={() => onClick(num)}
            className="channelButton"
        >
            {channel}
        </Button>
    );
}

function Favourites({ channels, onChannelClick }) {
    const { Card } = ReactBootstrap;

    const channelButtons =
        channels &&
        channels.length &&
        channels.map(channel => (
            <ChannelButton
                num={channel.num}
                channel={channel.channel}
                onClick={onChannelClick}
            />
        ));

    return (
        <Card style={{ width: '100%' }} className="card">
            <Card.Body>
                <Card.Title>Favourites</Card.Title>
                {channelButtons}
            </Card.Body>
        </Card>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
