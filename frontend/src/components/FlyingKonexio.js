import React, { Component } from 'react';
import { Image } from 'cloudinary-react';

class FlyingKonexio extends Component {

    render() {
        return (
            <div className="astronaut_div">
                { window.innerWidth > 776 ?
                    (<Image className="Bg_Astronaut" id="Bg_Astronaut" cloudName="viviennoel07" publicId="Bg_Astronaut_tldtdm" width="1000" />)
                    : window.innerWidth > 500 ?
                        (<Image className="Bg_Astronaut" id="Bg_Astronaut" cloudName="viviennoel07" publicId="Bg_Astronaut_tldtdm" width="776" />)
                        : (<Image className="Bg_Astronaut" id="Bg_Astronaut" cloudName="viviennoel07" publicId="Bg_Astronaut_tldtdm" width="500" />)
                }
            </div>
        );
    }
}

export default FlyingKonexio;