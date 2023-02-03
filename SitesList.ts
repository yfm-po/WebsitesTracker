import Site from './Site';

export default class SitesList {
    private sites: Site[];

    constructor() {
        this.sites = JSON.parse(localStorage.getItem("mySites") || '[]').map(
            (site) => new Site(site)
        );
    }

    public addSite(site: Site) {
        this.sites.push(site);
        localStorage.setItem("mySites", JSON.stringify(this.sites.map((site) => site.getName())));
    }

    public removeSite(site: Site) {
        this.sites = this.sites.filter((s) => s.getName() !== site.getName());
        localStorage.setItem("mySites", JSON.stringify(this.sites.map((site) => site.getName())));
    }

    public clearSites() {
        this.sites = [];
        localStorage.clear();
    }

    public getSites(): Site[] {
        return this.sites;
    }

    public getSite(index: number): Site {
        return this.sites[index];
    }

    public getLength(): number {
        return this.sites.length;
    }

    public getSiteByName(name: string): Site {
        return this.sites.find((site) => site.getName() === name);
    }

    public getSiteIndexByName(name: string): number {
        return this.sites.findIndex((site) => site.getName() === name);
    }

    public getSiteIndex(site: Site): number {
        return this.sites.findIndex((s) => s.getName() === site.getName());
    }

    public isSiteExist(site: Site): boolean {
        return this.sites.some((s) => s.getName() === site.getName());
    }

    public isSiteExistByName(name: string): boolean {
        return this.sites.some((site) => site.getName() === name);
    }

    public isSitesListEmpty(): boolean {
        return this.sites.length === 0;
    }

    public isSitesListNotEmpty(): boolean {
        return !this.isSitesListEmpty();
    }
}