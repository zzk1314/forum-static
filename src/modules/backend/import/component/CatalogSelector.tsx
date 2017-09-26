import * as React from "react";
import './CatalogSelector.less'
import _ from "lodash"
import { SelectField, MenuItem } from 'material-ui'
import { loadProblemCatalog } from "../problem/async"

export class CatalogSelector extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      data: {},
      targetCatalog: {},
      targetSubCatalog: {},
    }

  }

  getValue() {
    const { targetCatalog, targetSubCatalog } = this.state
    return { catalogId: targetCatalog.id, subCatalogId: targetSubCatalog.id }
  }

  componentWillMount() {
    const { subCatalogId, catalogId } = this.props
    loadProblemCatalog().then(res => {
      if(res.code === 200) {
        this.setState({ data: res.msg })
      }
    })
  }

  componentWillReceiveProps(props) {
    if(props.subCatalogId !== this.props.subCatalogId) {
      const subCatalog = _.find(this.state.data.subCatalogs, (subCatalog) => subCatalog.id === props.subCatalogId)
      this.setState({ targetSubCatalog: subCatalog })
    }

    if(props.catalogId !== this.props.catalogId) {
      const catalog = _.find(this.state.data.catalogs, (catalog) => catalog.id === props.catalogId)
      this.setState({ targetCatalog: catalog })
    }
  }

  render() {
    const { data, targetCatalog, targetSubCatalog } = this.state
    const { catalogs = [], subCatalogs = [] } = data

    return (
      <div className="catalog-selector">
        <div className="selector-inline">
          <SelectField
            value={targetCatalog}
            floatingLabelText="选择小课主类别"
            onChange={(e, idx, value) => this.setState({ targetCatalog: value })}
          >
            {
              catalogs.map((catalog, idx) => {
                return (
                  <MenuItem key={idx} value={catalog} primaryText={catalog.name}/>
                )
              })
            }
          </SelectField>
        </div>
        <div className="selector-inline">
          <SelectField
            value={targetSubCatalog}
            floatingLabelText="选择小课次级类别"
            onChange={(e, idx, value) => this.setState({ targetSubCatalog: value })}
          >
            {
              subCatalogs.map((subCatalog, idx) => {
                return (
                  <MenuItem key={idx} value={subCatalog} primaryText={subCatalog.name}/>
                )
              })
            }
          </SelectField>
        </div>
      </div>
    )
  }
}
