import React from "react";
import Carousel from "../../../../component/carousel/Carousel";
import useFetch from "../../../../hooks/useFetch";



const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;