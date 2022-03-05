// import Toast from 'react-native-root-toast';
// import Toast from 'react-native-toast-native';
import Toast from 'react-native-root-toast'
import { colors } from "../colors";
const custom_Toast = (props) => {
        Toast.show(props.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: colors.ternary
        })
}

export default custom_Toast;