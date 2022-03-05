import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <footer className="main-footer">
        <strong>
          Copyright © 2022-2030 <a href="/">QLT</a>.
        </strong>
         All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>
    )
  }
}
