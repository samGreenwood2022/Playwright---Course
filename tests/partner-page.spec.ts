import { checkOverviewPages } from '../helpers/overviewChecks';
import { loadCompanies } from '../test-data/companies';

checkOverviewPages('Partner', loadCompanies('partners.json'));
