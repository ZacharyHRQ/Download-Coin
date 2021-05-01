import { Image , Text } from 'rimble-ui';


function Display(data) {
    console.log(data)
    return (
        <>
            <Image
            alt="random unsplash image"
            borderRadius={8}
            height="auto"
            src="https://source.unsplash.com/random/1280x720"
            />
            <Text>{data.data.price}</Text>
            <Text>{data.data.title}</Text>
        </>
    )

}

export default Display;