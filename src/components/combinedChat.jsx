
import { Chat } from '../components/Chat'; 
import { Leftbar } from '../components/Leftbar';

export default function CombinedChat() {
    return (
        <div>
            <Leftbar />
            <Chat />
        </div>
    );
}
