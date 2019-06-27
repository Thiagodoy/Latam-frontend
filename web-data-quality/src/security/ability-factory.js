import { AbilityBuilder, Ability } from '@casl/ability'

class AbilityFactory {

    build(user) {
        let abilities = new Array();
        let agencys = this.getAgencys(user);

        //Ability.addAlias('upload', ['report', 'upload']);


        if (this.isMaster(user)) {
            abilities.push({ subject: ['all'], actions: 'manage' });
        } else if (this.isCoordenador(user)) {
            abilities.push({ subject: ['Upload', 'Opcao', 'User', 'File','Valid'], actions: 'manage', conditions: { agencys, profile: ['executivo de planejamento', 'executivo de vendas', 'master agência', 'agência'] } });
        } else if (this.isExecutivoVenda(user)) {
            abilities.push({ subject: ['Upload', 'Opcao', 'User','Valid'], actions: 'manage', conditions: { agencys, profile: ['master agência', 'agência'] } });
            abilities.push({ subject: ['File'], actions: 'upload' });
            abilities.push({ subject: ['File'], actions: 'report' });
        } else if (this.isExecutivoPlanejamento(user)) {
            abilities.push({ subject: ['Upload', 'Opcao', 'User','Valid'], actions: 'manage', conditions: { agencys, profile: ['master agência', 'agência'] } });
            abilities.push({ subject: ['File'], actions: 'upload' });
            abilities.push({ subject: ['File'], actions: 'report' });
        } else if (this.isMasterAgencia(user)) {
            abilities.push({ subject: ['Upload', 'Opcao', 'User', 'File'], actions: 'manage', conditions: { agencys, profile: ['agência'] } });
        } else if (this.isAgencia(user)) {
            abilities.push({ subject: ['Upload', 'Opcao'], actions: 'manage', });
            abilities.push({ subject: ['File'], actions: 'upload' });
            abilities.push({ subject: ['File'], actions: 'report' });
        }
        this.abilities = new Ability(abilities);
        return this.abilities;
    }

    isAgencia(user) {
        return user.groups.some(g => g.id == 'agência');
    }

    isMasterAgencia(user) {
        return user.groups.some(g => g.id == 'master agência');
    }

    isMaster(user) {
        return user.groups.some(g => g.id == 'master latam' || g.id == 'suporte behavior');
    }

    isCoordenador(user) {
        return user.groups.some(g => g.id == 'coordenador');
    }

    isExecutivoVenda(user) {
        return user.groups.some(g => g.id == 'executivo de vendas');
    }

    isExecutivoPlanejamento(user) {
        return user.groups.some(g => g.id == 'executivo de planejamento');
    }

    getAbilities() {
        return this.abilities;
    }

    getAgencys(user) {
        return user.info.filter(e => e.key == 'agencia').map(ee => {
            return { id: ee.value };
        });
    }

    getRule() {

        return this.abilities.rules;
    }
}

const instance = new AbilityFactory();
export default instance;