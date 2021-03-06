package com.emc.rpsp.fal.commons;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.util.HashSet;

@XmlRootElement
@XmlType(name = "RemoteISCSIPortsConfiguration")
public class RemoteISCSIPortsConfiguration {

    private String name;
    private HashSet<RemoteISCSIPortInformation> portsInformation;

    public RemoteISCSIPortsConfiguration() {
    }

    public RemoteISCSIPortsConfiguration(String name,
                                         HashSet<RemoteISCSIPortInformation> portsInformation) {
        this.name = name;
        this.portsInformation = portsInformation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public HashSet<RemoteISCSIPortInformation> getPortsInformation() {
        return portsInformation;
    }

    public void setPortsInformation(
        HashSet<RemoteISCSIPortInformation> portsInformation) {
        this.portsInformation = portsInformation;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime
            * result
            + ((portsInformation == null) ? 0 : portsInformation.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        RemoteISCSIPortsConfiguration other = (RemoteISCSIPortsConfiguration) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (portsInformation == null) {
            if (other.portsInformation != null)
                return false;
        } else if (!portsInformation.equals(other.portsInformation))
            return false;
        return true;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("RemoteISCSIPortsConfiguration [name=").append(name)
            .append(", portsInformation=").append(portsInformation)
            .append("]");
        return builder.toString();
    }


}
